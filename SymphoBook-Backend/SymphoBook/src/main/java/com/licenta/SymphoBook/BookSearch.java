package com.licenta.SymphoBook;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.Stack;
import java.util.Map.Entry;
import java.util.TreeMap;
import java.util.stream.Collectors;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Filters;

import org.apache.commons.lang3.ArrayUtils;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.google.common.reflect.TypeToken;
import com.google.gson.Gson;

@Component
public class BookSearch {

	@Autowired
	private BookRepository repository;

	@Autowired
	private BookWishlistRepository wishlistRepository;

	@Autowired
	private UserRepository userRepository;

	MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017");
	MongoDatabase db = mongoClient.getDatabase("SymphoBook");

	public Map<String, Map<String, Integer>> bookSearchList = new HashMap<String, Map<String, Integer>>();
	public ArrayList<String> wordsForSearch;
	public TreeMap<String, HashMap<String, Integer>> indirectIndex = new TreeMap<>();
	public ArrayList<String> words = new ArrayList<String>();// punem fiecare cuvant in array ca sa avem indecsi
	public int C; // nr cuvinte
	public int D; // nr carti
	public double[][] Tfidf;
	public Double[][] S = null;

	// BookData book;
	public List<Integer> Favorites = new ArrayList<Integer>();

	public BookSearch() {

	}

	public String addBook(String photo, String title, String description, int chapters, String language, String year,
			String author, List<String> mp3, String totalTime, List<String> tags) {

		List<BookHomepage> bookHomepageList = new ArrayList<BookHomepage>();
		for (Books book : repository.findAll()) {

			bookHomepageList.add(new BookHomepage(book.getId(), book.getTitle(), book.getPhoto(), book.getAuthor(),
					book.getFirstMp3()));
			if (title.equals(book.getTitle()))
				return "Book already exists!";

		}

		Books book = new Books(Integer.toString(bookHomepageList.size()), photo, title, description, chapters, language,
				year, author, mp3, totalTime, tags);
		repository.save(book);

		return "Added!";

	}

	public void getIndirectIndex() {

		MongoCollection<Document> collection = db.getCollection("IndirectIndex");

		String indirectIndexJson = "";
		FindIterable<Document> col = collection.find();

		for (Document doc : collection.find()) {
			indirectIndexJson += doc.toJson();
		}

		indirectIndexJson = "{" + indirectIndexJson.substring(46, indirectIndexJson.length()); // {"_id": {"$oid":
																								// "5f493f72b9dad1641d7294f3"},
																								// "0":

		Type typeToken = new TypeToken<TreeMap<String, HashMap<String, Integer>>>() {
		}.getType();

		indirectIndex = new Gson().fromJson(indirectIndexJson, typeToken);
		/*
		 * for(Entry<String, HashMap<String, Integer>> entry : indirectIndex.entrySet()
		 * ) { System.out.println(entry.getKey()); for(Entry<String, Integer> entry2 :
		 * entry.getValue().entrySet()) { System.out.println("	"+entry2.getKey() + ":"
		 * + entry2.getValue()); } }
		 */
	}

	public void getDirectIndex() {

		MongoCollection<Document> collection = db.getCollection("DirectIndex");

		String directIndexJson = "";
		Document directIndexDocument = collection.find().first();
		directIndexJson = directIndexDocument.toJson();
		directIndexJson = "{" + directIndexJson.substring(46, directIndexJson.length()); // {"_id": {"$oid":
																							// "5f493f72b9dad1641d7294f3"},
																							// "0":

		Type typeToken = new TypeToken<HashMap<String, Map<String, Integer>>>() {}.getType();

		bookSearchList = new Gson().fromJson(directIndexJson, typeToken);
	}

	public String SearchByTitle(String query, String filter) {

		Gson gson = new Gson();
		String jsonBookFound;
		List<BookHomepage> bookfoundnull = new ArrayList<BookHomepage>();
		List<BookHomepage> bookfound = new ArrayList<BookHomepage>();
		for (Books book : repository.findAllByTitle(query)) {
			bookfound.add(new BookHomepage(book.getId(), book.getTitle(), book.getPhoto(), book.getAuthor()));

		}
		if (!bookfound.isEmpty()) {
			jsonBookFound = gson.toJson(bookfound);
			return jsonBookFound;
		}

		return gson.toJson(bookfoundnull);

	}

	public HashMap<String, Integer> procesare(String description) {
		List<String> stopwords = StopWordList.getStopwords();

		HashMap<String, Integer> wordList = new HashMap<String, Integer>();

		StringBuilder sb = new StringBuilder();

		char c;
		for (int i = 0; i < description.length(); i++) {
			c = description.charAt(i);
			if (!Character.isLetterOrDigit((char) c)) {
				String newword = sb.toString().toLowerCase();

				PorterStemmer stemmer = new PorterStemmer();
				stemmer.add(newword.toCharArray(), newword.length());
				stemmer.stem();
				newword = stemmer.toString();

				if (stopwords.contains(newword)) {

					sb.setLength(0);
					continue;
				} else {
					if (wordList.containsKey(newword)) {
						wordList.put(newword, wordList.get(newword) + 1);
					} else {
						wordList.put(newword, 1);
					}
				}

				sb.setLength(0);
			} else {
				sb.append((char) c);
			}
		}

		wordList.remove("");

		return wordList;

	}

	// index direct pt toate cartile
	public Map<String, Map<String, Integer>> getIdsDescriptionsandTagsfromBooks() {
		ArrayList<String> Tags = new ArrayList<String>();
		HashMap<String, Integer> currentIdWords;
		for (Books book : repository.findAll()) {
			currentIdWords = procesare(book.getDescription());
			currentIdWords.putAll(procesare(book.getTitle()));
			currentIdWords.putAll(procesare(book.getAuthor()));

			Tags.addAll(book.getTags());

			for (int i = 0; i < Tags.size(); i++) {
				if (!Tags.get(i).contains("test_tag")) {
					currentIdWords.putAll(procesare(Tags.get(i)));
				}
			}

			bookSearchList.put(book.getId(), currentIdWords);
		}

		if (db.getCollection("DirectIndex") == null)
			db.createCollection("DirectIndex");

		MongoCollection<org.bson.Document> collection = db.getCollection("DirectIndex");

		// System.out.println("SIZE DIN DIRECTINDEX col= " +
		// collection.find().first().size());

		Document document = new Document();
		document.putAll(bookSearchList);

		collection.deleteMany(new Document());

		collection.insertOne(document);
		return bookSearchList;
	}

	//index indirect pt toata colectia
	public TreeMap<String, HashMap<String, Integer>> indirectIndex() {

		Iterator<Entry<String, Map<String, Integer>>> bookSearchListIterator = bookSearchList.entrySet().iterator();

		while (bookSearchListIterator.hasNext()) {
			Map.Entry<String, Map<String, Integer>> mapElement = (Map.Entry<String, Map<String, Integer>>) bookSearchListIterator
					.next();

			String id = mapElement.getKey();
			Map<String, Integer> directIndex = mapElement.getValue();

			for (Map.Entry<String, Integer> entry : directIndex.entrySet()) {
				String word = entry.getKey();
				int nr_apparitions = entry.getValue();

				if (indirectIndex.containsKey(word)) {

					HashMap<String, Integer> apparitions = indirectIndex.get(word);
					apparitions.put(id, nr_apparitions);
					indirectIndex.put(word, apparitions);
				} else {
					HashMap<String, Integer> apparitions = new HashMap<>();
					apparitions.put(id, nr_apparitions);
					indirectIndex.put(word, apparitions);
				}
			}

			// }

		}

		if (db.getCollection("IndirectIndex") == null)
			db.createCollection("IndirectIndex");

		MongoCollection<org.bson.Document> collection = db.getCollection("IndirectIndex");

		Document document = new Document();
		document.putAll(indirectIndex);
		collection.deleteMany(new Document());
		collection.insertOne(document);

		return indirectIndex;
	}

	// CAUTARE BOOLEANA
	private Set<String> search_word(String word) {
		if (!indirectIndex.containsKey(word)) {
			return null;
		}
		return indirectIndex.get(word).keySet();
	}

	private HashSet<String> applyOperator(Set<String> operand1, Set<String> operand2, String operator) {
		HashSet<String> result = new HashSet<>();

		for (String doc : operand1) {
			if (operand2.contains(doc)) {
				result.add(doc);
			}
		}
		return result;
	}

	public Set<String> booleanSearch(String query) { // abc and edf

		String[] splitQuery = query.split("\\s+");
		List<String> stopwords = StopWordList.getStopwords();

		Stack<String> operators = new Stack<>();
		Stack<String> operands = new Stack<>();

		int i = splitQuery.length - 1;
		while (i >= 0) {

			String word = splitQuery[i].toLowerCase();

			PorterStemmer stemmer = new PorterStemmer();
			stemmer.add(word.toCharArray(), word.length());
			stemmer.stem();
			word = stemmer.toString();

			if (stopwords.contains(word)) {

				i -= 2;
			} else {

				operands.push(word);
				--i;

				if (i >= 0) {
					operators.push(splitQuery[i--]);
				}
			}
		}

		Set<String> resultSet = search_word(operands.pop());

		try {
			while (!operands.empty() && !operators.empty()) {

				String operand = operands.pop();
				String operator = operators.pop();

				Set<String> currentSet = search_word(operand);

				resultSet = applyOperator(resultSet, currentSet, operator);
			}
		} catch (NullPointerException e) {
			return null;
		}

		return resultSet; // returneaza id-urile cartilor
	}

	public String getBooksFromBooleanSearch(String query, String filter) {
		Gson gson = new Gson();
		String jsonBooksId = "";

		Set<String> idsFromBooleanSearch = booleanSearch(query);
		List<BookHomepage> booksFromBooleanSearchNull = new ArrayList<BookHomepage>();
		if (idsFromBooleanSearch == null) {
			jsonBooksId = gson.toJson(booksFromBooleanSearchNull);
		} else {
			List<String> ListidsFromBooleanSearch = new ArrayList<String>();
			ListidsFromBooleanSearch = idsFromBooleanSearch.stream().collect(Collectors.toList());
			List<BookHomepage> booksFromBooleanSearch = new ArrayList<BookHomepage>();
			for (int i = 0; i < idsFromBooleanSearch.size(); ++i) {

				Books bookFromId = repository.findById(ListidsFromBooleanSearch.get(i)).orElse(null);
				booksFromBooleanSearch.add(new BookHomepage(bookFromId.getId(), bookFromId.getTitle(),
						bookFromId.getPhoto(), bookFromId.getAuthor()));

			}

			jsonBooksId = gson.toJson(booksFromBooleanSearch);
		}

		return jsonBooksId;

	}

	// RECOMANDATION

	public void getWords() {
		words.clear();
		for (String key : indirectIndex.keySet()) {
			words.add(key);
		}
	}

	public int TF(int x, int y) // de cate ori apare cuvantu x in y
	{
		HashMap<String, Integer> map = indirectIndex.get(words.get(x));
		if (map.containsKey(Integer.toString(y))) {
			return map.get(Integer.toString(y));
		} else
			return 0;
	}

	public int DF(int x) // in cate doc apare cuvantu per total
	{
		return indirectIndex.get(words.get(x)).size();
	}

	public void CreateTfidf() {
		getWords();
		int i, j;

		
		this.Tfidf = new double[D][C];

		for (i = 0; i < D; ++i) {
			for (j = 0; j < C; j++) {
				this.Tfidf[i][j] = (double) TF(j, i) * Math.log10(D / DF(j));
			}
		}

	}

	public void L2normalize(double[] in) {
		int i;
		double norm = 0.0;

		for (i = 0; i < in.length; ++i) {
			norm += in[i] * in[i];
		}

		norm = Math.sqrt(norm);

		for (i = 0; i < in.length; ++i) {
			in[i] = (double) in[i] / norm;
		}
	}

	//Calculates and saves S in DB
	public void calculateSimilarities() {
		//
		CreateTfidf();

		// Normalize

		for (int i = 0; i < D; i++) {
			L2normalize(this.Tfidf[i]);
		}

		// Transpose

		double[][] Tfidf_transpose = new double[C][D];

		for (int i = 0; i < C; ++i)
			for (int j = 0; j < D; ++j)
				Tfidf_transpose[i][j] = this.Tfidf[j][i];

		// S=Tfidf*Tfidf_transpose

		S = new Double[D][D]; 
		for (int k = 0; k < D; k++) {
			for (int e = 0; e < D; e++) {
				double sum = 0.0;
				for (int f = 0; f < C; f++) {
					sum = sum + this.Tfidf[e][f] * Tfidf_transpose[f][k];
				}
				S[e][k] = sum;
			}
		}
		// Adaugare S in BD
		if (db.getCollection("S") == null)
			db.createCollection("S");

		MongoCollection<org.bson.Document> collection = db.getCollection("S");

		Document document = new Document();
		Map<String, ArrayList<Double>> MapS = new HashMap<String, ArrayList<Double>>();
		for (int i = 0; i < D; i++) {
			MapS.put(Integer.toString(i), new ArrayList<Double>(Arrays.asList(S[i])));
		}
		document.putAll(MapS);
		collection.deleteMany(new Document());
		collection.insertOne(document);

	}

	public void getSimilarities() {
		
		if (S != null && S.length == D) {
			return;
		}

		// Is S in db?
		MongoCollection<Document> collection = db.getCollection("S");
		Document d = collection.find().first();
		String SJson = "";

		if (d != null) {
			if(d.size() <= 1) {
				calculateSimilarities();
				return;
			}
			SJson = d.toJson();
			SJson = "{" + SJson.substring(46, SJson.length());
		} else {
			calculateSimilarities();
			return;
		}

		Type typeToken = new TypeToken<HashMap<String, ArrayList<Double>>>() {}.getType();
		HashMap<String, ArrayList<Double>> Sdata = new Gson().fromJson(SJson, typeToken);

		// Load saved S
		S = new Double[D][D];
		for (int i = 0; i < D; i++) {
			ArrayList<Double> line = Sdata.get(Integer.toString(i));
			S[i] = line.toArray(S[i]);
		}

	}

	public List<Element> getRecommendedBooks(String uid) throws InterruptedException {
		List<Element> homepage = new ArrayList<Element>(D);

		for (int i = 0; i < D; i++) {
			homepage.add(i, new Element(i, 0));
		}

		BookWishlist OldWishlist = new BookWishlist();
		OldWishlist = wishlistRepository.findById(uid).orElse(null);
		if (OldWishlist != null) {
			for (int i = 0; i < OldWishlist.ListIdBook.size(); ++i) {
				Favorites.add(Integer.parseInt(OldWishlist.ListIdBook.get(i)));

			}
		}

		User user = new User();
		Books bookIdFromTitle;
		user = userRepository.findById(uid).orElse(null);

		List<String> bookTitleFavorite = new ArrayList<String>();

		if (user.getFavorites() != null) {
			bookTitleFavorite = user.getFavorites();
			if (user != null) {
				for (int i = 0; i < bookTitleFavorite.size(); ++i) {
					bookIdFromTitle = repository.findByTitle(bookTitleFavorite.get(i));
					if (!Favorites.contains(Integer.parseInt(bookIdFromTitle.getId()))) {
						Favorites.add(Integer.parseInt(bookIdFromTitle.getId()));
					}
				}
			}
		}

		/// Check if we have favs
		if (Favorites.size() == 0) {
			return null; // it's empty here
		}

		for (int f = 0; f < Favorites.size(); ++f) {
			System.out.println("Favorites" + "[" + f + "]=" + Favorites.get(f));
		}

		getSimilarities(); 
		Element e = new Element(0, 0);

		for (int i = 0; i < Favorites.size(); ++i) {
			e.score = 0;
			for (int j = 0; j < D; ++j) {
				e = homepage.get(j);
				if (i == 0)
					e.id = j;
				e.score += S[Favorites.get(i)][j];
				homepage.set(j, e);
			}
		}

		Collections.sort(homepage, new Comparator<Element>() {
			@Override
			public int compare(Element e1, Element e2) {
				return Double.compare(e1.score, e2.score);
			}
		});
		Collections.reverse(homepage);
		Favorites.clear();
		return homepage;

	}

	public String getJsonRecommendedBooks(String uid) throws InterruptedException {
		Gson gson = new Gson();
		Books b;

		List<Element> homepage = getRecommendedBooks(uid);

		String jsonBooksFrontPage = "";

		List<BookHomepage> bookHomepageList = new ArrayList<BookHomepage>();
		if (homepage != null) {
			for (Element book : homepage) {

				b = repository.findById(String.valueOf(book.getId())).orElse(null);

				try {

					bookHomepageList.add(
							new BookHomepage(b.getId(), b.getTitle(), b.getPhoto(), b.getAuthor(), b.getFirstMp3()));
				} catch (NullPointerException e) {

				}

			}
		} else { // nu avem favorites, fara recomandari
			for (Books book : repository.findAll()) {
				bookHomepageList.add(new BookHomepage(book.getId(), book.getTitle(), book.getPhoto(), book.getAuthor(),
						book.getFirstMp3()));

			}
		}
		jsonBooksFrontPage = gson.toJson(bookHomepageList);
		if (homepage != null)
			for (int i = 0; i < homepage.size(); ++i) {
				homepage.set(i, new Element(0, 0));
			}

		return jsonBooksFrontPage;

	}
}

package com.licenta.SymphoBook;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
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
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Aggregates;
import com.mongodb.client.model.Filters;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;



import com.google.gson.Gson;
import com.mongodb.BasicDBObject;
@Component
public class BookSearch {
	
	@Autowired
	private BookRepository repository;
	//public Books b;
	@Autowired
	private BookWishlistRepository wishlistRepository;
	
	 MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017");
	 MongoDatabase db = mongoClient.getDatabase("SymphoBook");

	
	
	
	public Map<String, Map<String,Integer>> bookSearchList = new HashMap<String, Map<String,Integer>> ();
	public ArrayList<String> wordsForSearch ;
	public TreeMap<String, HashMap<String, Integer>> indirectIndex= new TreeMap<>(); 
	public ArrayList<String> words = new ArrayList<String>();//punem fiecare cuvant in array ca sa avem indexi
	public int C; //nr cuvinte
	public int D; //nr carti
	public double [][] Tfidf;
	public double [][] S;

	//BookData book;
	public List<Integer> Favorites = new ArrayList<Integer>();
	
	
 public BookSearch() {
	
	}

 
 public String SearchByTitle(String query, String filter)
 {
	 
	 
	 
	 
	 return "";
	 
 } 
 
 public String SearchByAuthor(String query,String filter)
 {
	 
	 
	 return "";
 }
public HashMap<String, Integer> procesare( String description) 
	    {
	    	List<String> stopwords = StopWordList.getStopwords();
	    
	    	HashMap<String,Integer> wordList = new HashMap<String,Integer>();
	    
	        StringBuilder sb = new StringBuilder();
	      
	        char c;
	       for(int i =0; i<description.length();i++)
	       {
	           c=description.charAt(i);
	            if (!Character.isLetterOrDigit((char)c)) 
	            {
	                String newword = sb.toString().toLowerCase();
	                
	                PorterStemmer stemmer = new PorterStemmer();
	        		stemmer.add(newword.toCharArray(), newword.length());
	        		stemmer.stem();
	        		newword = stemmer.toString();

	               
	               
	                 if (stopwords.contains(newword))
	                {
	                 
	                    sb.setLength(0);
	                    continue;
	                }
	                else
	                {
	                    if (wordList.containsKey(newword))
	                    {
	                    	wordList.put(newword,wordList.get(newword)+1);
	                    } else 
	                    {
	                        wordList.put(newword, 1)      ;            }
	                }

	              
	                sb.setLength(0); 
	            }
	            else
	            {
	                sb.append((char)c); 
	            }
	        }

	        wordList.remove("");
	  
	         return wordList;
	      
	    }
	//index direct pt toate cartile
	public  Map<String, Map<String,Integer>> getIdsDescriptionsandTagsfromBooks ()
	{
		ArrayList <String> Tags = new ArrayList<String>();
		HashMap<String, Integer> currentIdWords;
		for(Books book: repository.findAll())
		{
			currentIdWords=procesare(book.getDescription());
			currentIdWords.putAll(procesare(book.getTitle()));
			currentIdWords.putAll(procesare(book.getAuthor()));
		

			Tags.addAll(book.getTags());
			
			for(int i=0;i<Tags.size();i++)
			{
				currentIdWords.putAll(procesare(Tags.get(i)));
			}

			bookSearchList.put(book.getId(),currentIdWords );
		}
		
		   if(db.getCollection("DirectIndex")==null)
		        db.createCollection("DirectIndex");
	     
			 MongoCollection<org.bson.Document> collection = db.getCollection("DirectIndex");
			 
			 
			 
	        Document document = new Document();
	        document.putAll(bookSearchList);
	        collection.deleteOne(document);
	        collection.insertOne(document);
		return bookSearchList;
	}
	
	
//index indirect pt toata colectia
    public TreeMap<String, HashMap<String, Integer>> indirectIndex()       
	    {
	    
	  
	        Iterator<Entry<String, Map<String, Integer>>> bookSearchListIterator = bookSearchList.entrySet().iterator(); 
	        
	  
	        while (bookSearchListIterator.hasNext()) {
	            Map.Entry<String, Map<String, Integer>> mapElement = (Map.Entry<String, Map<String, Integer>>)bookSearchListIterator.next();
	            

	                        
	            			String id = mapElement.getKey();
	            			Map<String, Integer> directIndex = mapElement.getValue();
	            			
	                        for(Map.Entry<String, Integer> entry : directIndex.entrySet())
	                        {
	                            String word = entry.getKey();
	                            int nr_apparitions = entry.getValue();

	                            if (indirectIndex.containsKey(word))
	                            {
	                                
	                                HashMap<String, Integer> apparitions = indirectIndex.get(word);
	                                apparitions.put(id, nr_apparitions);
	                                indirectIndex.put(word, apparitions);
	                            }
	                            else
	                            {
	                                HashMap<String, Integer> apparitions = new HashMap<>();
	                                apparitions.put(id, nr_apparitions);
	                                indirectIndex.put(word, apparitions);
	                            }
	                        }

	                    
	                    //}
	                   
	                }
	      
	        if(db.getCollection("IndirectIndex")==null)
		        db.createCollection("IndirectIndex");
	     
			 MongoCollection<org.bson.Document> collection = db.getCollection("IndirectIndex");
			 
			 
			 
	        Document document = new Document();
	        document.putAll(indirectIndex);
	        collection.deleteOne(document);
	        collection.insertOne(document);
	        
	        
	        
	        

	     /*   Gson g = new Gson();
			String json="";
			json=g.toJson(indirectIndex);
			searchRepository.save(json);*/
	         return indirectIndex;
	        }
	
    
    //CAUTARE BOOLEANA
    private Set<String> search_word(String word)
    {
        if (!indirectIndex.containsKey(word))
        {
            return null;
        }
        return indirectIndex.get(word).keySet(); 
    }


    private HashSet<String> applyOperator(Set<String> operand1, Set<String> operand2, String operator)
    {
        HashSet<String> result = new HashSet<>();

        for (String doc : operand1) 
        {
            if (operand2.contains(doc))
            {
                result.add(doc); 
            }
        }
        return result;
}

    public Set<String> booleanSearch(String query)
    {
       
        String[] splitQuery = query.split("\\s+");
        List<String> stopwords = StopWordList.getStopwords();


        
        Stack<String> operators = new Stack<>();
        Stack<String> operands = new Stack<>();

       
        int i = splitQuery.length - 1;
        while (i >= 0)
        {
          
            String word = splitQuery[i].toLowerCase();
         
            PorterStemmer stemmer = new PorterStemmer();
    		stemmer.add(word.toCharArray(), word.length());
    		stemmer.stem();
    		word = stemmer.toString();


      
          if (stopwords.contains(word))
            {
               
                i -= 2;
            }
            else 
            {
                
                operands.push(word); --i;

                if (i >= 0)
                {
                    operators.push(splitQuery[i--]);
                }
            }
        }


        Set<String> resultSet = search_word(operands.pop());

        try {
            while (!operands.empty() && !operators.empty())
            {
    
                String operand = operands.pop();
                String operator = operators.pop();

                Set<String> currentSet = search_word( operand);

                resultSet = applyOperator(resultSet, currentSet, operator);
            }
        } catch (NullPointerException e)
        {
            return null;
        }

        return resultSet; //returneaza id-urile cartilor
    }
    
    public String getBooksFromBooleanSearch(String query)
   
    {
    	//String error="";
    	Gson gson = new Gson ();
    	String jsonBooksId="";
    	String word="";
    	
    	 Set<String> idsFromBooleanSearch = booleanSearch(query);
    	 List<String> ListidsFromBooleanSearch = new ArrayList<String>();
    	 ListidsFromBooleanSearch=idsFromBooleanSearch.stream().collect(Collectors.toList());
    	 List<BookHomepage> booksFromBooleanSearch = new ArrayList<BookHomepage>();
    	for(int i=0; i<idsFromBooleanSearch.size();++i)
    	{
    		
    		
    		Books bookFromId = repository.findById(ListidsFromBooleanSearch.get(i)).orElse(null);
    		booksFromBooleanSearch.add(new BookHomepage(bookFromId.getId(),bookFromId.getTitle(),bookFromId.getPhoto(),bookFromId.getAuthor()));
    		
    	}
    
    	jsonBooksId=gson.toJson(booksFromBooleanSearch);
    	
    	
    	return jsonBooksId;
    
    	
    }
    
    //RECOMANDATION 
    
    public void getWords()
    {
    	for (String key : indirectIndex.keySet() )
    	{
    		words.add(key); 		
    	}

    }
    
    public int TF(int x, int y)
    {

    	HashMap<String,Integer> map = indirectIndex.get(words.get(x));
    	if(map.containsKey(Integer.toString(y)))
    		return map.get(Integer.toString(y));
    	else return 0;
    }
    
    public int DF(int x)
    {
    	return indirectIndex.get(words.get(x)).size();
    }
    
    public void CreateTfidf()
    {	
    	getWords();
    	int i, j;
    	Tfidf=new double [D][C];
    	for(i=0;i<D;++i)
    	{
    		for(j=0;j<C;j++)
    		{
    			Tfidf[i][j]=(TF(j,i)*Math.log10((D/DF(j))));
    		}
    	}
    	
    }
    
    public void L2normalize(double [] in) 
    {
    	int i;
    	double norm =  0.0;
    	for(i=0;i<in.length;++i)
    		norm+=in[i]*in[i];
    	norm=Math.sqrt(norm);
    	for(i=0;i<in.length;++i)
    		in[i]=(double) in[i]/norm;
    	
    }
    
    
    public void calculate_similarities() {
    	
    	
    	int i,j;
    	CreateTfidf();
    	
    	
    	//Normalize
    	
    	for(i=0;i<D;i++)
    	{
    		L2normalize(Tfidf[i]);
    	}
    	
    	//Transpose
    	
    	double [][] Tfidf_transpose = new double [C][D];
    	
    	for(i=0;i<C;++i)
    		for (j=0;j<D;++j)
    			Tfidf_transpose[i][j]=Tfidf[j][i];
    	
    	//S=Tfidf*Tfidf_transpose
    	
    	S=new double[D][D];
    	for(i=0;i<D;i++)
    		for(j=0;j<D;j++)
    			for(int k =0;k<C;k++)
    				S[i][j]+=Tfidf[j][k]*Tfidf_transpose[k][j];
    	
    	
    }
    
    public List<Element> getRecommendedBooks(String uid) throws InterruptedException
    {
    	int i, j;
    	List<Element> homepage = new ArrayList<Element>(D);
    	for(i=0;i<D;i++)
    	{
    		homepage.add(i, new Element(i,0));
    	}
    	BookWishlist OldWishlist = new BookWishlist();
   		OldWishlist=wishlistRepository.findById(uid).orElse(null);
   		

   		for( i=0;i<OldWishlist.ListIdBook.size();++i)
   		{
   			Favorites.add(Integer.parseInt(OldWishlist.ListIdBook.get(i)));
   			
   		}
   		
   		
   		RetriveDataFromDbUserProfile profile = new RetriveDataFromDbUserProfile(uid);
		Thread t=new Thread(profile);
		   t.start();
		    Thread.sleep(10000);
		    t.join();
		    Books bookFromTitle;
		    List<String> ListFavorites = profile.getListFavorites();
		    if (ListFavorites.size() != 0)
		    {
		    	System.out.println("ListFavories size = "+ListFavorites.size());
		    for(i=0;i<ListFavorites.size();++i)
		    {
		    	System.out.println("ListFavories"+"["+i+"]="+  	ListFavorites.get(i));
		    	bookFromTitle = repository.findByTitle(ListFavorites.get(i));
		    	//remove duplicates
		    	if (!Favorites.contains(Integer.parseInt(bookFromTitle.getId())))
		    			Favorites.add(Integer.parseInt(bookFromTitle.getId()));
		    	
		    }
		    
		    }
		    ///Check if we have favs
		    if(Favorites.size() == 0) {
		    	return null; // it's empty here
		    }
		    
		    calculate_similarities();
		    Element e;
		    
		    for(i=0;i<Favorites.size();++i)
		    	{for(j=0;j<D;++j)
		    	{
		    		e=homepage.get(j);
		    		e.score+=S[Favorites.get(i)][j];
		    		homepage.set(j,e);
		    		
		    	}
		    	}
		    
	   Collections.sort(homepage,Collections.reverseOrder());
	   
	   return homepage;
    	
    	
    }
    public String getJsonRecommendedBooks(String uid) throws InterruptedException
    {
    	Gson gson = new Gson();
    	Books b;
    	List<Element> homepage=getRecommendedBooks(uid);
    	String jsonBooksFrontPage="";

       List<BookHomepage> bookHomepageList = new ArrayList<BookHomepage>();
    	if(homepage != null)
    	{for (Element book: homepage)
    		{
    		
    		b =	repository.findById(String.valueOf(book.getId())).orElse(null);
    		System.out.println(bookHomepageList.size());
    		//System.out.println("book="+b.getId()+" "+b.getTitle()+" "+b.getPhoto()+" "+b.getAuthor()+" "+b.getFirstMp3());
    	   bookHomepageList.add(new BookHomepage(b.getId(),b.getTitle(),b.getPhoto(),b.getAuthor(),b.getFirstMp3()));
    	   System.out.println(bookHomepageList.size());
    		//bookHomepageList.add(new BookHomepage(b.getId(),b.getTitle(),b.getPhoto(),b.getAuthor(),b.getFirstMp3()));
    		}
    	}
    	else { //nu avem favorites, fara recomandari
    		for (Books book: repository.findAll())
    		{		
    			System.out.println("book="+book.getId()+" "+book.getTitle()+" "+book.getPhoto()+" "+book.getAuthor()+" "+book.getFirstMp3());
    			bookHomepageList.add(new BookHomepage(book.getId(),book.getTitle(),book.getPhoto(),book.getAuthor(),book.getFirstMp3()));

    		}
    	}
    	jsonBooksFrontPage=gson.toJson(bookHomepageList);
    	return jsonBooksFrontPage;
    	
    }
}

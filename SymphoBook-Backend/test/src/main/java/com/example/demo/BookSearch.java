package com.example.demo;

import java.io.IOException;
import java.util.ArrayList;
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

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.google.gson.Gson;
@Component
public class BookSearch {
	
	@Autowired
	private BookRepository repository;
	//public Books b;
	public Map<String, Map<String,Integer>> bookSearchList = new HashMap<String, Map<String,Integer>> ();
	public ArrayList<String> wordsForSearch ;
	public TreeMap<String, HashMap<String, Integer>> indirectIndex= new TreeMap<>(); ;
	
	
	
 public BookSearch() {
	
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

			Tags.addAll(book.getTags());
			
			for(int i=0;i<Tags.size();i++)
			{
				currentIdWords.putAll(procesare(Tags.get(i)));
			}

			bookSearchList.put(book.getId(),currentIdWords );
		}
	/*	Gson g = new Gson();
		String json="";
		json=g.toJson(bookSearchList);*/
		
		return bookSearchList;
	}
	
	
//index indirect pt toata colectia
    public TreeMap<String, HashMap<String, Integer>> indirectIndex()       
	    {
	    
	  
	          /*  String currentFolder =websiteFolder ;
	            File folder = new File(currentFolder);
	            File[] listOfFiles = folder.listFiles();
*/
	     
	        Iterator<Entry<String, Map<String, Integer>>> bookSearchListIterator = bookSearchList.entrySet().iterator(); 
	        
	  
	        while (bookSearchListIterator.hasNext()) {
	            Map.Entry<String, Map<String, Integer>> mapElement = (Map.Entry<String, Map<String, Integer>>)bookSearchListIterator.next();
	            
/*
	                    if (file.isFile() && file.getAbsolutePath().endsWith(".directindex.txt"))
	                    {
	                        String fileName = file.getAbsolutePath();
	                        String docName = fileName.replace(".directindex.txt", "");

	                       
	                        Type directIndexType = new TypeToken<HashMap<String, Integer>>(){}.getType();
	                        HashMap<String, Integer> directIndex = gsonBuilder.fromJson(new String(Files.readAllBytes(file.toPath())), directIndexType);*/
	                        
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
	    /*
	                Writer writer = new BufferedWriter(new OutputStreamWriter(
	                        new FileOutputStream("indirectindex.txt"), "utf-8"));
	                writer.write(gsonBuilder.toJson(indirectIndex));
	                writer.close();

	              */

	                
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
    
    public String getBooksFromBooleanSearch(String query, String filter)
   
    {
    	Gson gson = new Gson ();
    	String jsonBooksId="";
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
    
}

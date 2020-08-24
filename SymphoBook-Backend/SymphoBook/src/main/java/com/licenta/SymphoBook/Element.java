package com.licenta.SymphoBook;

public class Element implements Comparable<Element>{
 
	public int id;
	public double score;
	
	public Element(int id, double score)  {
		super();
		this.id = id;
		this.score = score;
	}
	
	
	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public double getScore() {
		return score;
	}


	public void setScore(double score) {
		this.score = score;
	}


	public int compareTo(Element e)
	{
		return (int)(this.score-e.score);
		/*  0-daca sunt egale
		 *  >0 primu el>el2
		 *  <0 el1<el2
		 */
	}
	
}

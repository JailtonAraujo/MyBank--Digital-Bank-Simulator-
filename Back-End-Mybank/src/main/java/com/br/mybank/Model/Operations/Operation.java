package com.br.mybank.Model.Operations;

import java.io.Serializable;

import lombok.Data;

@Data
public class Operation implements Serializable{
	
	private Long id;
	
	private String name;

	private static final long serialVersionUID = 1L;

}

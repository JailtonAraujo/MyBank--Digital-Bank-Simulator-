package com.br.mybank.Model;

import javax.persistence.Entity;

import lombok.Data;

@Entity(name = "tbl_physicalperson")
@Data
public class PhysicalPerson extends Person{
	
	private static final long serialVersionUID = 1L;
	
	private String cpf;

	
}

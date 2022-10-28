package com.br.mybank.Model;

import javax.persistence.Entity;

import lombok.Data;

@Data
@Entity(name = "tbl_contapoupanca")
public class SavingsAccount extends Account {

	private static final long serialVersionUID = 1L;
	
	private int taxaJuros;

}

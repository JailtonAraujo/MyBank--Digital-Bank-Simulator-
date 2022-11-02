package com.br.mybank.Model;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@SequenceGenerator(initialValue = 1, name = "seq_account_id",allocationSize = 1)
@Entity
public abstract class Account implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "seq_account_id")
	private Long id;
	
	private int agencia;
	
	private int conta;
	
	private int digito;
	
	private LocalDate dataAbertura;
	
	@JsonIgnore
	@OneToOne(cascade = CascadeType.ALL)
	private Person person;
	

}

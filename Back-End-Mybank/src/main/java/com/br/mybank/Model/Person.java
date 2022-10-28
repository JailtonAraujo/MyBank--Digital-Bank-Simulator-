package com.br.mybank.Model;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.OneToOne;
import javax.persistence.SequenceGenerator;

import lombok.Data;

@Data
@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@SequenceGenerator(initialValue = 1, name = "seq_person")
public abstract class Person implements Serializable{
	
	private static final long serialVersionUID = 1L;

	@Id @GeneratedValue(strategy = GenerationType.SEQUENCE,generator = "seq_person")
	private Long id;
	
	private String name;
	
	private String lastname;
	
	@OneToOne(mappedBy = "person", fetch = FetchType.LAZY, orphanRemoval = true, cascade = CascadeType.ALL)
	private AddressClass address;
	

}

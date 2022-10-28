package com.br.mybank.Model;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import org.hibernate.annotations.ForeignKey;

import lombok.Data;

@Data
@Entity(name = "tbl_address")
public class AddressClass implements Serializable{
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String uf;
	
	private String cep;
	
	private String city;
	
	private String street;
	
	private int number;

	private static final long serialVersionUID = 1L;
	
	@OneToOne(cascade = CascadeType.ALL,fetch = FetchType.LAZY)
	@JoinColumn(name = "person_id")
	@ForeignKey(name = "fk_addres_person")
	private Person person;

}

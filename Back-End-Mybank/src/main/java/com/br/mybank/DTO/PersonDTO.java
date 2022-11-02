package com.br.mybank.DTO;

import java.io.Serializable;

import com.br.mybank.Model.Person;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PersonDTO implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private Long id;
	
	private String name;
	
	private String lastname;

	private AccountDTO account;
	
	public PersonDTO(Person person) {
		this.id = person.getId();
		this.name = person.getName();
		this.lastname = person.getLastname();
		this.account = new AccountDTO(person.getAccount());
	}

}

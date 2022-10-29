package com.br.mybank.Model;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

import org.hibernate.annotations.ForeignKey;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "tbl_savingsaccount")
public class SavingsAccount extends Account {

	private static final long serialVersionUID = 1L;
	
	private Float taxaJuros_per_month;
	
	private Double saldo;
	
	@OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JoinColumn(name = "person_id")
	@ForeignKey(name = "fk_savingsaccount_person")
	private Person person;
	


}

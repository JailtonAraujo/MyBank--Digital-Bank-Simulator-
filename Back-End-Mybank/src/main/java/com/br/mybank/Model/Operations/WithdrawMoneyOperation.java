package com.br.mybank.Model.Operations;

import java.io.Serializable;
import java.time.LocalDate;

import javax.persistence.*;

import com.br.mybank.Model.Account;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity(name = "tbl_withdraw_money")
public class WithdrawMoneyOperation implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	@Id @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@ManyToOne(cascade = CascadeType.MERGE,fetch = FetchType.EAGER,optional = false)
	@JoinColumn(name = "account_id")
	@org.hibernate.annotations.ForeignKey(name = "fk_withdraw_account")
	private Account account;

	private Double value;
	
	private LocalDate date;
	

}

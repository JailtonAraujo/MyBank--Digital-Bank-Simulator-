package com.br.mybank.Model.Operations;

import java.io.Serializable;

import lombok.Data;

@Data
public class WithdrawMoneyOperation implements Serializable{
	
	private Long accountId;
	
	private Double value;
	
	private static final long serialVersionUID = 1L;

}

package com.br.mybank.DTO;

import java.io.Serializable;
import java.time.LocalDate;

import com.br.mybank.Model.Account;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AccountReportDTO implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long id;

	private int agencia;

	private int conta;

	private int digito;

	private LocalDate dataAbertura;

	private PersonDTO person;

	public AccountReportDTO (Account account) {
		this.id = account.getId();
		this.agencia = account.getAgencia();
		this.conta = account.getConta();
		this.digito = account.getDigito();
		this.dataAbertura = account.getDataAbertura();
		this.person = account.getPerson() != null ? new PersonDTO(account.getPerson()) : new PersonDTO();
	}

}

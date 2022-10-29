package com.br.mybank.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.br.mybank.Model.SavingsAccount;

public interface SavingsAccountRepository extends JpaRepository<SavingsAccount, Long>{
	
	@Query(value = "select count(1) > 0 from tbl_savingsaccount where agencia = ?1 and conta = ?2 and digito = ?3")
	public Boolean verifyIfExistsAccount (int agencia, int conta, int digito);
	
	@Modifying
	@Query(value = "update tbl_savingsaccount set saldo = ?1 where person_id = ?2 ")
	public void withDrawMoney (Double value, Long accountId);
	
	@Query(value = "select saldo from tbl_savingsaccount where id = ?1")
	public Double findSaldoByAccountId(Long accountId);

}

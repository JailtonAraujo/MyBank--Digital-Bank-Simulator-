package com.br.mybank.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.br.mybank.Model.SavingsAccount;

@Repository
@Transactional
public interface SavingsAccountRepository extends JpaRepository<SavingsAccount, Long>{
	
	@Query(value = "select count(1) > 0 from tbl_savingsaccount where agencia = ?1 and conta = ?2 and digito = ?3")
	public Boolean verifyIfExistsAccount (int agencia, int conta, int digito);
	
	@Modifying
	@Query(value = "update tbl_savingsaccount set saldo = ?1 where id = ?2 ")
	public void withDrawMoney (Double value, Long accountId);
	
	@Query(value = "select saldo from tbl_savingsaccount where id = ?1")
	public Double findSaldoByAccountId(Long accountId);

}

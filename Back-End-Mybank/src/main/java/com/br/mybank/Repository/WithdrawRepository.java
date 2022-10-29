package com.br.mybank.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.mybank.Model.Operations.WithdrawMoneyOperation;

public interface WithdrawRepository extends JpaRepository<WithdrawMoneyOperation, Long>{

}

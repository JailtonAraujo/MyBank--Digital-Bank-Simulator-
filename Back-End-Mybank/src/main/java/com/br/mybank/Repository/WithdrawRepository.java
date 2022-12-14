package com.br.mybank.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.mybank.Model.Operations.WithdrawMoneyOperation;
import org.springframework.stereotype.Repository;

@Repository
public interface WithdrawRepository extends JpaRepository<WithdrawMoneyOperation, Long>{

}

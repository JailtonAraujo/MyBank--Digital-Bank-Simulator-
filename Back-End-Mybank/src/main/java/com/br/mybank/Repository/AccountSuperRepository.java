package com.br.mybank.Repository;

import com.br.mybank.Model.Account;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface AccountSuperRepository extends JpaRepository<Account, Long> {

    @Query(value = "select count(1) > 0 from Account where agencia = ?1 and conta = ?2 and digito = ?3")
    public Boolean verifyIfExistsAccount (int agencia, int conta, int digito);
}

package com.br.mybank.Service;

import com.br.mybank.DTO.AccountDTO;
import com.br.mybank.DTO.AuthDTO;
import com.br.mybank.Model.Account;

public interface AccountGenericServices {

    public Account generatedModelAccount();

    public Boolean verifyIfExistsAccount(Account account);
    
    public AccountDTO getCurrentAccount(Long accountId);
   
    
    
 
}

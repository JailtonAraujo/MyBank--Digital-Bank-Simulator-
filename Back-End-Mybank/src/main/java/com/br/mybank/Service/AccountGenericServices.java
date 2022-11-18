package com.br.mybank.Service;

import com.br.mybank.Model.Account;

public interface AccountGenericServices {

    public Account generatedModelAccount();

    public Boolean verifyIfExistsAccount(Account account);
    
    
 
}

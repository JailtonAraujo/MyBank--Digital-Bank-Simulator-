package com.br.mybank.Service;

import com.br.mybank.DTO.AccountReportDTO;
import com.br.mybank.Model.Account;

public interface AccountGenericServices {

    public Account generatedModelAccount();

    public Boolean verifyIfExistsAccount(Account account);
    
    public AccountReportDTO getCurrentAccount(Long accountId);
   
    
    
 
}

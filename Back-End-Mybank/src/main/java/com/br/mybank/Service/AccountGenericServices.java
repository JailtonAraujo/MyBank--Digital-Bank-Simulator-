package com.br.mybank.Service;

import com.br.mybank.Model.Account;
import net.sf.jasperreports.engine.JRException;

public interface AccountGenericServices {

    public String generateWithdrawOperationCertificate( Long withdrawId) throws Exception;

    public Account generatedModelAccount();

    public Boolean verifyIfExistsAccount(Account account);
}

package com.br.mybank.Service.impls;

import com.br.mybank.Model.Account;
import com.br.mybank.Model.Operations.WithdrawMoneyOperation;
import com.br.mybank.Model.SavingsAccount;
import com.br.mybank.Repository.AccountSuperRepository;
import com.br.mybank.Repository.WithdrawRepository;
import com.br.mybank.Service.AccountGenericServices;
import com.br.mybank.Service.ReportUtil;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class AccountGenericServicesImpl implements AccountGenericServices {

    @Autowired
    protected AccountSuperRepository accountSuperRepository;

    @Autowired
    protected WithdrawRepository withdrawRepository;

    @Autowired
    protected ReportUtil reportUtil;

    protected Random random = new Random();

    @Override
    public String generateWithdrawOperationCertificate(Long withdrawId) throws Exception {

        Optional<WithdrawMoneyOperation> optional = withdrawRepository.findById(withdrawId);

        if(optional.isPresent()){
            List<WithdrawMoneyOperation> withdrawList = new ArrayList<WithdrawMoneyOperation>();

            withdrawList.add(optional.get());

            String pdfBase64 = "data:application/pdf;base64,"+Base64.encodeBase64String(reportUtil.generatedReport(withdrawList,"report_withdraw"));

            return pdfBase64;
        }else {
            throw new Exception("nothing found with id");
        }
    }

    @Override
    public Account generatedModelAccount() {
        SavingsAccount account = new SavingsAccount();
        account.setAgencia(1308);

        account.setConta(random.nextInt(9999999));

        account.setDigito(random.nextInt(9));

        account.setDataAbertura(LocalDate.now());

        return account;
    }

    @Override
    public Boolean verifyIfExistsAccount(Account account) {
        return accountSuperRepository.verifyIfExistsAccount(account.getAgencia(),account.getConta(),account.getDigito());
    }


}

package com.br.mybank.Service.impls;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.br.mybank.DTO.AccountReportDTO;
import com.br.mybank.Model.Operations.TransferOperation;
import com.br.mybank.Model.Operations.WithdrawMoneyOperation;
import com.br.mybank.Repository.AccountSuperRepository;
import com.br.mybank.Repository.TransferRepository;
import com.br.mybank.Repository.WithdrawRepository;
import com.br.mybank.Service.CertificateService;
import com.br.mybank.Service.ReportUtil;

import net.sf.jasperreports.engine.JRException;

@Service
public class CertificateServiceImpl implements CertificateService{
	
	
	@Autowired
	protected WithdrawRepository withdrawRepository;
	
	@Autowired
	protected TransferRepository transferRepository;
	
	@Autowired
	protected AccountSuperRepository accountSuperRepository;
	
	@Autowired
	protected ReportUtil reportUtil;
	

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
	public String generateTransferCertificate(Long transferId) throws Exception {

		Optional<TransferOperation> optional = transferRepository.findById(transferId);
		
		if(optional.isPresent()) {
			List <TransferOperation> list = new ArrayList<TransferOperation>();
			
			list.add(optional.get());
			
			String pdfBase64 = "data:application/pdf;base64,"+Base64.encodeBase64String(reportUtil.generatedReport(list,"report_transfer"));

			return pdfBase64;
		}
		
		throw new Exception("nothing found with id");
	}
	
	

	@Override
	public String generateCreateAccountCertificate(Long accountId) {
	List<AccountReportDTO> dtos = new ArrayList<AccountReportDTO>();
		
		AccountReportDTO dto = new AccountReportDTO(accountSuperRepository.findById(accountId).get());
		
		dtos.add(dto);
		
		try {
			String certificateBase64 = "data:application/pdf;base64," + Base64.encodeBase64String(
					reportUtil.generatedReport(dtos, "report_created_account")
					);
			
			return certificateBase64;
			
		} catch (JRException e) {
			e.printStackTrace();
		}
		
		return null;
	}

}

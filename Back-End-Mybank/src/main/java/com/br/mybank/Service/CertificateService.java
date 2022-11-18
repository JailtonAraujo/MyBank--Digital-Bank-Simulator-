package com.br.mybank.Service;

public interface CertificateService {

	public String generateWithdrawOperationCertificate(Long withdrawId) throws Exception;

	public String generateTransferCertificate(Long transferId) throws Exception;

	// Generate certificate of account created
	public String generateCreateAccountCertificate(Long accountId);
}

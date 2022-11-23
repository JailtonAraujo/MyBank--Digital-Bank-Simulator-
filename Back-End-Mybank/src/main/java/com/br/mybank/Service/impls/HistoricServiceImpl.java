package com.br.mybank.Service.impls;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.br.mybank.DTO.ObjectPaginationOperationsAccount;
import com.br.mybank.DTO.TransferDTO;
import com.br.mybank.DTO.WithdrawDTO;
import com.br.mybank.Repository.HistoricRepository;
import com.br.mybank.Service.HistoricService;

@Service
public class HistoricServiceImpl implements HistoricService{
	
	
	@Autowired
	protected HistoricRepository historicRepository;

	@Override
	public Page<WithdrawDTO> getAllWithdrawOperarionsByAccountId(ObjectPaginationOperationsAccount objectPagination) {
		
		return historicRepository.getAllWithdrawOperationByAccountId(objectPagination);
	}

	@Override
	public Page<TransferDTO> getAllTrasnferOperationByAccountId(ObjectPaginationOperationsAccount objectPagination) {
		
		return historicRepository.getAllTransferByAccountId(objectPagination);
	}
	
	

}

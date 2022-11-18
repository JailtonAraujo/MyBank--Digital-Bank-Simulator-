package com.br.mybank.Service;

import org.springframework.data.domain.Page;

import com.br.mybank.DTO.ObjectPaginationOperationsAccount;
import com.br.mybank.DTO.WithdrawDTO;

public interface HistoricService {

	//find all withdraw  operations related at an account
    public Page<WithdrawDTO> getAllWithdrawOperarionsByAccountId (ObjectPaginationOperationsAccount objectPagination ); 
}

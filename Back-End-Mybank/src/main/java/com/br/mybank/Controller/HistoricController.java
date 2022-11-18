package com.br.mybank.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.br.mybank.DTO.ObjectPaginationOperationsAccount;
import com.br.mybank.DTO.WithdrawDTO;
import com.br.mybank.Service.HistoricService;

@RestController
@RequestMapping("/historic")
public class HistoricController {
	
	@Autowired
	protected HistoricService historicService;
	
	@PostMapping(value = "/withdraw")
	public ResponseEntity<Page<WithdrawDTO>> getAllWithdrawOperationsByAccountId( @RequestBody ObjectPaginationOperationsAccount objectPagination ){
		
		return ResponseEntity.ok(historicService.getAllWithdrawOperarionsByAccountId(objectPagination));
	}
}

package com.br.mybank.Repository;


import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.br.mybank.DTO.ObjectPaginationOperationsAccount;
import com.br.mybank.DTO.TransferDTO;
import com.br.mybank.DTO.WithdrawDTO;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Repository
public class HistoricRepository{

	@Autowired
	private EntityManager entityManager;
	
	
	@Transactional
	public Page<WithdrawDTO> getAllWithdrawOperationByAccountId(ObjectPaginationOperationsAccount objectPagination) {
		
		Query query = entityManager.createNativeQuery("select tbl_withdraw_money.id, tbl_withdraw_money.date, tbl_withdraw_money.value \r\n"
				+ "from tbl_withdraw_money\r\n"
				+ "inner join account on tbl_withdraw_money.account_id = account.id\r\n"
				+ "where account.id = ?");
		
		query.setParameter(1, objectPagination.getAccountId());
		
		
	
		List<WithdrawDTO> dtos = new ArrayList<WithdrawDTO>();
		
		List<Object[]> objects = query.setFirstResult(objectPagination.getOffset()).setMaxResults(objectPagination.getLimit()).getResultList();
		
		if(objects.size() == 0) {
			throw new NoResultException("Not found operations for this account!");	
		}
		
		for (Object[] object : objects) {
			
			WithdrawDTO dto = new WithdrawDTO().builder().id( Long.parseLong(object[0].toString()))
					.date( LocalDate.parse(object[1].toString(), DateTimeFormatter.ofPattern("yyyy-MM-dd")))
					.value(Double.valueOf(object[2].toString())).build();
			
			dtos.add(dto);
		}
		
		//Pageable pageable = PageRequest.of(0, objectPagination.getLimit());
		
		Page<WithdrawDTO> page = new PageImpl<WithdrawDTO>(dtos, PageRequest.of(0, objectPagination.getLimit()), 
				this.CountWithdrawByAccountId(objectPagination.getAccountId()));
		
		return page;
		
	}
	
	
	
	public int CountWithdrawByAccountId(Long accountId) {
		
		Query query = (Query) entityManager.createNativeQuery("select count(1) from tbl_withdraw_money where account_id = ?");
		
		query.setParameter(1, accountId);
		
		String value = query.getSingleResult().toString();
		
		Integer count = value != null ? Integer.parseInt(value) : 0;
		
		return count;
	}
	
	
	public Page<TransferDTO> getAllTransferByAccountId(ObjectPaginationOperationsAccount objectPagination){
			
		Query query = entityManager.createNativeQuery("select tbl_transfer.id, tbl_transfer.date, tbl_transfer.value, origemPerson.name as nameOrigem, origemPerson.lastname as lastnameOrigem,\r\n"
				+ "destinoName.name as nameDestino, destinoName.lastname as lastnameDestino\r\n"
				+ "from tbl_transfer\r\n"
				+ "inner join account as origemAccount on origemAccount.id = tbl_transfer.account_origem\r\n"
				+ "inner join tbl_physicalperson as origemPerson on origemPerson.id = origemAccount.person_id\r\n"
				+ "\r\n"
				+ "inner join account as destinoAccount on  destinoAccount.id = tbl_transfer.account_destino\r\n"
				+ "inner join tbl_physicalperson as destinoName on destinoName.id = destinoAccount.id\r\n"
				+ "where origemAccount.id = ? or destinoAccount.id = ?");
		
		query.setParameter(1, objectPagination.getAccountId());
		query.setParameter(2, objectPagination.getAccountId());
		
		List<TransferDTO> listDtos = new ArrayList<TransferDTO>();
		
		List<Object[]> objects = query.setFirstResult(objectPagination.getOffset()).setMaxResults(objectPagination.getLimit()).getResultList();
		
		if(objects.size() == 0) {
			throw new NoResultException("Not found operations for this account!");	
		}
		
		
		for (Object[] object : objects) {
			
			TransferDTO dto = new TransferDTO().builder().id(Long.parseLong(object[0].toString()))
					.date( LocalDate.parse( object[1].toString(), DateTimeFormatter.ofPattern("yyyy-MM-dd")))
					.value(Double.valueOf(object[2].toString()))
					.namePersonOrigem(  object[3].toString()+" "+object[4].toString())
					.namePersonDestino( object[5].toString()+" "+object[6].toString() ).build();
			
			listDtos.add(dto);
		}
		
		Page<TransferDTO> page = new PageImpl<>(listDtos, PageRequest.of(0, objectPagination.getLimit()), 
				this.CountTransferwByAccountId(objectPagination.getAccountId()));
		
		
		return page;
	}
	
public int CountTransferwByAccountId(Long accountId) {
		
		Query query = (Query) entityManager.createNativeQuery("select count(1) from tbl_transfer\r\n"
				+ "where tbl_transfer.account_destino = ? or tbl_transfer.account_origem = ?");
		
		query.setParameter(1, accountId);
		query.setParameter(2, accountId);
		
		String value = query.getSingleResult().toString();
		
		Integer count = value != null ? Integer.parseInt(value) : 0;
		
		return count;
	}
	
}

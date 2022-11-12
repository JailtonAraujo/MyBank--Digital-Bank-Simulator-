package com.br.mybank.Repository;

import com.br.mybank.DTO.AccountDTO;
import com.br.mybank.DTO.PhysicalPersonDTO;
import com.br.mybank.Model.Account;
import com.br.mybank.Model.PhysicalPerson;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.Query;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Repository
public class PhysicalPersonCustomRepository implements Serializable {

    private static final long serialVersionUID = 2403844549605156225L;

    @Autowired
    private EntityManager entityManager;

    public List<PhysicalPersonDTO> findByName(String name) {
        Query query = entityManager.createNativeQuery("select id, name from tbl_physicalperson where name like '" + name + "%'");
        try {

            List<Object[]> objecLists = query.setMaxResults(10).getResultList();

            List<PhysicalPersonDTO> dtos = new ArrayList<PhysicalPersonDTO>();

            for (Object[] object : objecLists) {
                PhysicalPersonDTO dto = new PhysicalPersonDTO().builder().id(Long.parseLong(object[0].toString())).name(object[1].toString()).build();
                dtos.add(dto);
            }

            return dtos;

        } catch (NoResultException e) {
            e.printStackTrace();
            throw new NoResultException("Nenhum Usuario encontrado com esse nome.");
        }
    }


    // find person by your account
    public PhysicalPersonDTO findByAccount(Account account) throws Exception {

        Query query = entityManager.createNativeQuery("select account.id as account_id, account.agencia, account.conta, " +
                "account.digito, tbl_physicalperson.id as person_id, tbl_physicalperson.cpf, tbl_physicalperson.name, tbl_physicalperson.lastname\n" +
                "from tbl_physicalperson\n" +
                "inner join account on tbl_physicalperson.id = account.person_id\n" +
                "where account.agencia = ? and account.conta = ? and account.digito = ?");

        query.setParameter(1,account.getAgencia());
        query.setParameter(2,account.getConta());
        query.setParameter(3,account.getDigito());

        try{

            Object [] object = (Object[]) query.getSingleResult();

            if(object.length > 0){
                AccountDTO accountDTO = new AccountDTO()
                        .builder().id(Long.parseLong(object[0].toString()))
                        .agencia(Integer.parseInt(object[1].toString())).conta(Integer.parseInt(object[2].toString()))
                        .digito(Integer.parseInt(object[3].toString())).build();

                PhysicalPersonDTO physicalPersonDTO = new PhysicalPersonDTO()
                        .builder().id(Long.parseLong(object[4].toString())).cpf(object[5].toString()).name(object[6].toString())
                        .lastname(object[7].toString()).account(accountDTO).build();

                return physicalPersonDTO;

            } else if (object.length == 0 || object == null) {
                throw new NoResultException("No person related to this account!");
            }

        }catch (Exception ex){
           throw new Exception(ex.getMessage());
        }
        return null;
    }
}

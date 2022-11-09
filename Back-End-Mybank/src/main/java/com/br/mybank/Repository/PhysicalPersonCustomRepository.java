package com.br.mybank.Repository;

import com.br.mybank.DTO.PhysicalPersonDTO;
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
        //query.setParameter(1,name);

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
}

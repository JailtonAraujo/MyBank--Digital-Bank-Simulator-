package com.br.mybank.Service;

import java.io.InputStream;
import java.io.Serializable;
import java.util.List;

import org.apache.commons.collections.map.HashedMap;
import org.springframework.stereotype.Service;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

@Service
public class ReportUtil implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	
	public byte [] generatedReport(List lisData, String reportName) throws JRException {
		
		JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(lisData);
		
		InputStream stream = this.getClass().getClassLoader().getResourceAsStream("reports/"+reportName+".jasper");
		
		JasperPrint print = JasperFillManager.fillReport(stream, new HashedMap(), dataSource);
		
		return JasperExportManager.exportReportToPdf(print);
	
	}

}

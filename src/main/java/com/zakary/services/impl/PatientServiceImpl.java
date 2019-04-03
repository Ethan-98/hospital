package com.zakary.services.impl;

import com.zakary.dao.PageDao;
import com.zakary.dao.PatientDao;
import com.zakary.dao.TreatmentDao;
import com.zakary.dao.utils.DoctorPatients;
import com.zakary.exp.BusinessException;
import com.zakary.mapper.DoctorMapper;
import com.zakary.mapper.PatientMapper;
import com.zakary.services.PatientService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
public class PatientServiceImpl implements PatientService {

    private Logger logger = LoggerFactory.getLogger(getClass());
    @Autowired
    private PatientMapper patientMapper;

    @Override
    public int getPatientsCounts() {
        return patientMapper.getAllPatientsCounts();
    }

    @Override
    public List<DoctorPatients> getAllPatientByDoctorId(PageDao pageDao,String id) {
        if(id==null||id==""||id=="1")
            throw new BusinessException("id不存在");
        int doctor_id=Integer.parseInt(id);
        System.out.println("医生ID: "+doctor_id);
        pageDao.setDoctor_id(doctor_id);
        return patientMapper.selectAllPatientsByDoctorId(pageDao);
    }

    @Override
    public void insertPatient(@RequestBody TreatmentDao treatmentDao) {//此处需要在前端自动将此医生的id赋值
        if((treatmentDao.getDoctor_id()==null)
            ||(treatmentDao.getPatient_id()==null)
            ||(treatmentDao.getTreatment_name()==null)
            ||(treatmentDao.getTreatment_time()==null)
            ||(treatmentDao.getTreatment_fee()==null))
            throw new BusinessException("必要参数为空");
        else if(patientMapper.getCountById(treatmentDao.getPatient_id())==0)
            throw new BusinessException("此患者不存在");
        else if(patientMapper.getCountByIdInTreatment(treatmentDao.getPatient_id())!=0)
            throw new BusinessException("此患者已存在在治疗名单中");
        else
            patientMapper.insertPatientTreatmnet(treatmentDao);
    }
}

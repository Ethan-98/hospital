package com.zakary.dao;

public class PageDao {  //分页查询需要
    private int page;
    private int limit;
    private Integer cert_code;
    private Integer patient_id;
    private Integer doctor_id;

    public Integer getDoctor_id() {
        return doctor_id;
    }

    public void setDoctor_id(Integer doctor_id) {
        this.doctor_id = doctor_id;
    }

    public Integer getCert_code() {
        return cert_code;
    }

    public void setCert_code(Integer doctor_id) {
        this.cert_code = doctor_id;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public Integer getPatient_id() {
        return patient_id;
    }

    public void setPatient_id(Integer patient_id) {
        this.patient_id = patient_id;
    }
}

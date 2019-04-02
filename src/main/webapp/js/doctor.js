var tableIns;
$(document).ready(function () {
    var element = layui.element;
    var layer = layui.layer;
    element.init();
    element.on('nav(nav_left)',function (elem) {
        // console.log(elem.context.innerText)
    })
    var table = layui.table;
    tableIns = table.render({
        elem: '#doctor_cursor',
        url: '/hospital/doctor/getDoctors.do', //数据接口
        skin: 'row ', //行边框风格
        page:true,
        id:'testReload',
        cols: [[ //表头
            {field: 'doctor_id', title: '编号', width:'10%',  unresize:true},
            {field: 'doctor_name', title: '姓名', width:'10%',unresize:true},
            {field: 'doctor_department', title: '部门', width:'20%',unresize:true},
            {field: 'doctor_position', title: '职位', width:'20%',unresize:true},
            {field: 'doctor_gender', title: '性别', width: '10%',unresize:true},
            {field: 'doctor_tel', title: '电话', width: '20%', unresize:true},
            {field: 'action', title: '操作', width: '10%', unresize:true,toolbar:'<div><button class="layui-btn layui-btn-sm layui-btn-normal" lay-event="edit">修改</button><button class="layui-btn layui-btn-sm layui-btn-danger" lay-event="del">删除</button></div>'}
        ]]
    });
    table.on('tool(doctor_table)',function (obj) {
        var data = obj.data;
        if(obj.event=='edit'){
            var form = layui.form;
            form.val("updateForm",{
                "doctor_id":data.doctor_id,
                "doctor_name":data.doctor_name,
                "doctor_department":data.doctor_department,
                "doctor_gender":data.doctor_gender,
                "doctor_position":data.doctor_position,
                "doctor_tel":data.doctor_tel
            })
            form.on('submit(doSubmit)',function (data) {
                $('#myModal').modal('hide');
                var index = layer.load(2);
                $.ajax({
                    url:'/hospital/doctor/updateDoctor.do',
                    type:'post',
                    contentType:"application/json",
                    datatype:"json",
                    data : JSON.stringify(data.field)
                }).done(function (data) {
                    if(data.code==0){
                        layer.close(index);
                        layer.msg("修改成功",{time: 1000},function () {
                            tableIns.reload({where: {doctor_id: '',}});
                        })
                    }else{
                        layer.close(index);
                        layer.msg(data.msg,{time:1000})
                    }
                })
            })
            form.render()
            $('#myModal').modal('show');
        }else if(obj.event=='del'){
            layer.confirm('删除用户:'+data.doctor_name+"?", {icon: 7, title:'提示'}, function(index){
                layer.close(index)
                var v = layer.load(2);
                $.ajax({
                    url:'/hospital/doctor/deleteDoctor.do',
                    type:'post',
                    contentType:"application/json",
                    datatype:"json",
                    data : JSON.stringify({"doctor_id":data.doctor_id})
                }).done(function (data) {
                    if(data.code==0){
                        layer.close(v);
                        layer.msg("删除成功",{time: 1000},function () {
                            tableIns.reload({where: {doctor_id: '',}});
                            $('#search_id').val('');
                        })
                    }else{
                        layer.close(v);
                        layer.msg(data.msg,{time:1000})
                    }
                })
            });
        }
    });
})
function search() {
    tableIns.reload({where: {doctor_id: $('#search_id').val(),}, page: {curr: 1}})
    $('#search_id').val('');
}
function updateDoctor() {
    $('#hideSubmit').click();
}
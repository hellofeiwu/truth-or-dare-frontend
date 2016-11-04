app.provider('Language', function LanguageProvider($translateProvider, CONF) {

    this.setLang = function() {
        $translateProvider.translations('en', {
            title: 'Truth or Dare',
            add: 'Add',
            edit: 'Edit',
            save: 'Save',
            cancel: 'Cancel',
            user_name: 'User Name',
            phone: 'Phone Number',
            logout: 'Log Out',
            import: 'Import',
            search: 'Search by tracking number or phone number...',
            pending: 'Pending',
            received: 'Received',
            accepted: 'Accepted',
            accept: 'Accept',
            order_status: 'Order Status',
            platform: 'Platform',
            order_number: 'Order Number',
            tracking_number: 'Tracking Number',
            import_port: 'Import Port',
            commodity_doc: 'Commodity Doc',
            customer_name: 'Customer Name',
            customer_phone: 'Customer Phone',
            send_sms: 'Send SMS',
            clearance_material: 'Clearance Material',
            not_sent: 'Not Sent',
            success: 'Sent',
            fail: 'Fail',
            add_customer: 'Add Customer',
            detail: 'Detail',
            clearance_material_detail: 'Clearance Material Detail',
            download: 'Download',
            id_type: 'ID Type',
            id_photo: 'ID Photo',
            commodity_doc_photo: 'Commodity Doc Photo'
        });
        $translateProvider.translations('zh', {
            title: '真心话，大冒险',
            add: '添加',
            edit: '编辑',
            save: '保存',
            cancel: '取消',
            user_name: '用户名',
            phone: '手机号',
            logout: '登出',
            import: '批量导入',
            search: '请按快递单号或者手机号码进行搜索...',
            pending: '未处理',
            received: '材料收到',
            accepted: '材料已接受',
            accept: '接受',
            order_status: '订单状态',
            platform: '平台',
            order_number: '订单号码',
            tracking_number: '快递单号',
            import_port: '进口口岸',
            commodity_doc: '货物资料',
            customer_name: '客户姓名',
            customer_phone: '客户手机号',
            send_sms: '发送短信',
            clearance_material: '清关材料',
            not_sent: '未发送',
            success: '成功',
            fail: '失败',
            add_customer: '添加联系人',
            detail: '查看详情',
            clearance_material_detail: '清关材料详情',
            download: '打包下载',
            id_type: '身份材料类型',
            id_photo: '身份材料照片',
            commodity_doc_photo: '货物资料'
        });
        $translateProvider.preferredLanguage(CONF.defaultLang);
    };

    this.$get = [function LanguageProviderFactory() {
        return new LanguageProvider();
    }];
});
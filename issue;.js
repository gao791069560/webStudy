// 异常下发工单
const lcdp = supos.services.lcdp;

let productComponentConfigurationModelName = 'model_29';
/*查询产品配置数据*/
const productComponentConfigurationRes = await lcdp.find(productComponentConfigurationModelName, id);
console.log(`productComponentConfigurationRes ${JSON.stringify(productComponentConfigurationRes)}`);
let productComponentConfigurationRecord = productComponentConfigurationRes.data;

/*获取产品配置工单号*/
const productComponentConfigurationWorkderOderNum = productComponentConfigurationRecord.model_29_47;
console.log(
  `productComponentConfigurationWorkderOderNum ${JSON.stringify(productComponentConfigurationWorkderOderNum)}`,
);

/*获取产品配置组件编号*/
const productComponentConfigurationComponentCode = productComponentConfigurationRecord.model_29_15;
console.log(`productComponentConfigurationComponentCode ${JSON.stringify(productComponentConfigurationComponentCode)}`);

/*获取产品配置产品编号*/
const productComponentConfigurationProduceNum = productComponentConfigurationRecord.model_29_3;
console.log(`productComponentConfigurationProduceNum ${JSON.stringify(productComponentConfigurationProduceNum)}`);

/*获取产品配置合同编号*/
const productComponentConfigurationContractNum = productComponentConfigurationRecord.model_29_30;
console.log(`productComponentConfigurationContractNum ${JSON.stringify(productComponentConfigurationContractNum)}`);

/*匹配物料模型名称*/
const matchMaterialModelName = 'model_41';

const pageOption = { pageIndex: 1, pageSize: 1000 };

const matchMaterialQueryCondition = {
  needFlow: false,
  fields: [],
  filter: {
    conditions: [
      {
        column: 'model_41_2',
        dataType: 'string',
        operator: 'eq',
        value: [productComponentConfigurationProduceNum],
      },
      {
        column: 'model_41_4',
        dataType: 'string',
        operator: 'eq',
        value: [productComponentConfigurationComponentCode],
      },
    ],
  },
  sort: [],
  columns: [],
};
const matchMaterialRes = await lcdp.query(matchMaterialModelName, matchMaterialQueryCondition, pageOption);

console.log(`matchMaterialRes: ${JSON.stringify(matchMaterialRes)}`);
/* 获取匹配物料库存 //包含(model_41_7:物料编码,model_41_8:物料数量,model_41_10:单位)*/
let matchMaterialData = matchMaterialRes.list;

/*根据产品编号查询工单配置总览匹配数据*/
const workerOrderConfigModelName = 'model_66';
const workerOrderConfigQueryCondition = {
  needFlow: false,
  fields: [],
  filter: {
    conditions: [
      {
        column: 'model_66_16',
        dataType: 'string',
        operator: 'eq',
        value: [productComponentConfigurationProduceNum],
      },
    ],
  },
  sort: [],
  columns: [],
};
const workerOrderConfigData = await lcdp.query(workerOrderConfigModelName, workerOrderConfigQueryCondition, pageOption);
console.log(`workerOrderConfigData: ${JSON.stringify(workerOrderConfigData)}`);

/*下发工单*/
console.log(`下发工单`);
/*修改产品配置状态*/
const productComponentConfigurationSuccessResult = await lcdp.update(productComponentConfigurationModelName, id, {
  model_29_38: ['已下发工单'],
});
console.log(`result ${JSON.stringify(productComponentConfigurationSuccessResult)}`);

/*根据工单号查询工单管理总览匹配数据*/
const workerOrderOverviewModelName = 'model_87';

const workerOrderOverviewQueryCondition = {
  needFlow: false,
  fields: [],
  filter: {
    conditions: [
      {
        column: 'model_87_12',
        dataType: 'string',
        operator: 'eq',
        value: [productComponentConfigurationWorkderOderNum],
      },
    ],
  },
  sort: [],
  columns: [],
};
const workOrderOverviewData = await lcdp.query(
  workerOrderOverviewModelName,
  workerOrderOverviewQueryCondition,
  pageOption,
);
console.log(`workOrderOverviewData: ${JSON.stringify(workOrderOverviewData)}`);
/*获取匹配数据的recordId*/
let workerOrderOverviewId = workOrderOverviewData.list[0].id;
/*修改工单产品总览匹配数据状态*/
const updateWorkerOrderOverviewSuccessResult = await lcdp.update(workerOrderOverviewModelName, workerOrderOverviewId, {
  model_87_5: ['已下发工单'],
});
console.log(`updateWorkerOrderOverviewSuccessResult: ${JSON.stringify(updateWorkerOrderOverviewSuccessResult)}`);

/*根据工单号查询工单配置总览匹配数据*/
const workerOrderConfigQueryCondition2 = {
  needFlow: false,
  fields: [],
  filter: {
    conditions: [
      {
        column: 'model_66_36',
        dataType: 'string',
        operator: 'eq',
        value: [productComponentConfigurationWorkderOderNum],
      },
    ],
  },
  sort: [],
  columns: [],
};
const orderConfigData = await lcdp.query(workerOrderConfigModelName, workerOrderConfigQueryCondition2, pageOption);
console.log(`orderConfigData: ${JSON.stringify(orderConfigData)}`);
/*获取匹配数据的recordId*/
let orderConfigId = orderConfigData.list[0].id;
/*修改工单产品总览匹配数据状态*/
const updateOrderConfigSuccessResult = await lcdp.update(workerOrderConfigModelName, orderConfigId, {
  model_66_18: ['已下发工单'],
});
console.log(`updateOrderConfigSuccessResult: ${JSON.stringify(updateOrderConfigSuccessResult)}`);

/*根据产品编号查询订单产品明细数据 productComponentConfigurationProduceNum productComponentConfigurationContractNum*/
const orderDetailsModelName = 'model_1';
const orderDetailQueryCondition = {
  needFlow: false,
  fields: [],
  filter: {
    conditions: [
    //   {
    //     column: 'model_1_2',
    //     dataType: 'string',
    //     operator: 'eq',
    //     value: [productComponentConfigurationContractNum],
    //   },
      {
        column: 'model_1_23',
        dataType: 'string',
        operator: 'eq',
        value: [productComponentConfigurationProduceNum],
      },
    ],
  },
  sort: [],
  columns: [],
};
const orderDetailData = await lcdp.query(orderDetailsModelName, orderDetailQueryCondition, pageOption);
console.log(`orderDetailData: ${JSON.stringify(orderDetailData)}`);
/*获取匹配数据的recordId*/
let orderDetailId = orderDetailData.list[0].id;
/*获取订单号*/
let orderDetailOrderNumber = orderDetailData.list[0].model_1_36;
console.log('>>>>', orderDetailId);
/*修改订单产品明细匹配数据状态*/
const updateOrderDetailSuccessResult = await lcdp.update(orderDetailsModelName, orderDetailId, {
  model_1_14: ['已下发工单'],
});
console.log(`updateOrderDetailSuccessResult: ${JSON.stringify(updateOrderDetailSuccessResult)}`);

/*根据订单号查询订单总览 orderDetailOrderNumber*/
const orderOverviewModelName = 'model_83';

const orderOverviewQueryCondition = {
  needFlow: false,
  fields: [],
  filter: {
    conditions: [
      {
        column: 'model_83_1',
        dataType: 'string',
        operator: 'eq',
        value: [orderDetailOrderNumber],
      },
    ],
  },
  sort: [],
  columns: [],
};
const orderOverviewData = await lcdp.query(orderOverviewModelName, orderOverviewQueryCondition, pageOption);
console.log(`orderOverviewData: ${JSON.stringify(orderOverviewData)}`);
/*获取匹配数据的recordId*/
let orderOverviewId = orderOverviewData.list[0].id;
/*修改订单总览匹配数据状态*/
const updateOrderOverviewSuccessResult = await lcdp.update(orderOverviewModelName, orderOverviewId, {
  model_83_10: ['已下发工单'],
});
console.log(`updateOrderOverviewSuccessResult: ${JSON.stringify(updateOrderOverviewSuccessResult)}`);

/*根据组件编号查询组件工序拆分  productComponentConfigurationComponentCode*/
const componentProcessModelName = 'model_118';

const componentProcessQueryCondition = {
  needFlow: false,
  fields: [],
  filter: {
    conditions: [
      // {
      //   column: 'model_118_5',
      //   dataType: 'string',
      //   operator: 'eq',
      //   value: [productComponentConfigurationComponentCode],
      // },
      {
        column: 'model_118_3',
        dataType: 'string',
        operator: 'eq',
        value: [productComponentConfigurationProduceNum],
      },
    ],
  },
  sort: [],
  columns: [],
};
const componentProcessData = await lcdp.query(componentProcessModelName, componentProcessQueryCondition, pageOption);
console.log(`componentProcessData: ${JSON.stringify(componentProcessData)}`);

/*获取匹配数据的recordId*/
let componentProcessIds = componentProcessData.list.map((item) => item.id);

if (componentProcessIds.length > 0) {
  /*修改订单总览匹配数据状态*/
  for (let componentProcessId of componentProcessIds) {
    const updateComponentProcessSuccessResult = await lcdp.update(componentProcessModelName, componentProcessId, {
      model_118_12: ['已下发工单'],
      model_118_28: orderConfigData.list[0].model_66_17,
    });
    console.log(
      `updateComponentProcessSuccessResult${componentProcessId}: ${JSON.stringify(
        updateComponentProcessSuccessResult,
      )}`,
    );
  }
}

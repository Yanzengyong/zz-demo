<script setup>
import { ref } from 'vue'


const treeData = ref([
  {
    id: 1,
    label: '光学部件',
    children: [
      {
        id: 2,
        label: '激光类',
        icon: 'src/assets/images/baseIcon.png'
      }, 
      {
        id: 3,
        label: '光源',
        icon: 'src/assets/images/baseIcon.png'
      }, 
      {
        id: 4,
        label: '镜片类',
        icon: 'src/assets/images/baseIcon.png',
        children: [
          {
            id: 7,
            label: '透射镜片'
          }, 
          {
            id: 8,
            label: '反射镜片',
            children: [
              {
                id: 12,
                label: '平面反射镜片'
              },
              {
                id: 13,
                label: '球面反射镜片'
              },
              {
                id: 14,
                label: '非球面反射镜片',
                children: [
                  {
                    id: 16,
                    label: '紫外光非球面3D高反射率反射镜'
                  }
                ]
              },
              {
                id: 15,
                label: '半反射镜片'
              }
            ]
          }, 
          {
            id: 9,
            label: '折射镜'
          }, 
          {
            id: 10,
            label: '定位镜'
          }, 
          {
            id: 11,
            label: '声光偏转器'
          }
        ]
      }, 
      {
        id: 5,
        label: '光学仪器',
        icon: 'src/assets/images/baseIcon.png'
      }, 
      {
        id: 6,
        label: '光学器件',
        icon: 'src/assets/images/baseIcon.png'
      }
    ]
  }
])

const renderStoreyData = ref([
  {
    parentId: 1,
    parentName: '光学部件',
    list: [
      { name: '激光类', icon: 'src/assets/images/baseIcon.png' },
      { name: '光源', icon: 'src/assets/images/baseIcon.png' },
      { name: '镜片类', icon: 'src/assets/images/baseIcon.png' },
      { name: '光学仪器', icon: 'src/assets/images/baseIcon.png' },
      { name: '光学器件', icon: 'src/assets/images/baseIcon.png' }
    ]
  }
])


const getClass = (isLast) => {
  if (renderStoreyData.value.length === 1) {
    if (isLast) {
      return 'storey'
    } else {
      return 'storey_img'
    }
  } else {
    if (isLast) {
      return 'storey'
    } else {
      return 'storey_img'
    }
  }
}

const findTreeNode = (treeData, labelToFind) =>{
  // 遍历树结构数据
  for (let i = 0; i < treeData.length; i++) {
    const currentNode = treeData[i];

    // 如果当前节点的label等于要查找的值，直接返回当前节点
    if (currentNode.label === labelToFind) {
      return currentNode;
    }

    // 如果当前节点有子节点，递归查找子节点
    if (currentNode.children && currentNode.children.length > 0) {
      const childResult = findTreeNode(currentNode.children, labelToFind);

      // 如果在子节点中找到了对应的值，返回子节点的结果
      if (childResult) {
        return childResult;
      }
    }
  }

  // 如果未找到匹配的节点，返回null
  return '';
}

const findParentNode = (treeData, labelToFind, parent = null) => {
  // 遍历树结构数据
  for (let i = 0; i < treeData.length; i++) {
    const currentNode = treeData[i];

    // 如果当前节点的label等于要查找的值，返回父节点
    if (currentNode.label === labelToFind) {
      return parent;
    }

    // 如果当前节点有子节点，递归查找子节点，传递当前节点作为父节点
    if (currentNode.children && currentNode.children.length > 0) {
      const childResult = findParentNode(currentNode.children, labelToFind, currentNode);

      // 如果在子节点中找到了对应的值，返回子节点的结果
      if (childResult) {
        return childResult;
      }
    }
  }

  // 如果未找到匹配的节点，返回null
  return null;
}

const nodeClick = (node, parentNode) => {
  // console.log('node===', node)
  // console.log('parentNode===', parentNode)
  // console.log('renderStoreyData===', renderStoreyData.value)

  const clickIndex = renderStoreyData.value.findIndex((item) => {
    return parentNode.parentName === item.parentName
  })
  // console.log('renderStoreyData.value.length - 1 - 2', renderStoreyData.value.length - 1 - 2)
  // console.log('clickIndex', clickIndex)
  if (renderStoreyData.value.length - 2 > clickIndex) {
    // 此时，点击是非最后两个层级
    alert('只能点击最后一层或倒数第二层')
    return
  }

  // 只有一个节点且不是最后一层时
  if (parentNode.list.length === 1 && clickIndex !== renderStoreyData.value.length - 1) {
    console.log('!')
    const targetObj = findParentNode(treeData.value, node.name)
    // 收缩
    renderStoreyData.value.pop()
    renderStoreyData.value[renderStoreyData.value.length - 1].list = targetObj.children.map((item) => {
      return {
        name: item.label,
        ...item
      }
    })
  } else {

    const targetObj = findTreeNode(treeData.value, node.name)

    if (!targetObj.children || targetObj.children && targetObj.children.length === 0) {
      alert('该节点下无节点')
      return
    }
    // 展开
    renderStoreyData.value = renderStoreyData.value.map((item) => {
      if (item.parentName === parentNode.parentName) {
        item.list = [node]
      }
      return item
    })
    renderStoreyData.value.push({
    parentId: targetObj.id,
    parentName: targetObj.label,
    list: targetObj.children.map((item) => {
        return {
          name: item.label,
          tagBg: 'red'
        }
      })
    })
  }
}
</script>

<template>
  <main class="container">
    <div class="kind-title">
      <div class="content">
        <img class="item-image" src="@/assets/images/title_icon.png" alt="">
        <span>光学部件</span>
      </div>
    </div>
    <div v-for="(item, index) in renderStoreyData" :key="item.parentName" :class="getClass(index === renderStoreyData.length - 1)">
      <div v-for="node in item.list" :key="node.name" class="ment-item-box">
        <div v-if="node.icon" class="ment-item-img" :style="{backgroundImage: `url(${node.icon})`}" @click="nodeClick(node, item)">
          {{ node.name }}
        </div>
        <div v-else class="ment-item" :style="{backgroundColor: node.tagBg, borderColor: node.tagBg}" @click="nodeClick(node, item)">
          {{ node.name }}
        </div>
      </div>
    </div>

  </main>
</template>

<style scoped>
.container{
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-content: center;
  justify-content: flex-start;
  flex-direction: column;
}
.kind-title{
  width: 50%;
  height: 100px;
  background-image: url('@/assets/images/kind_title_bg.png');
  background-size: 100%;
  background-repeat: no-repeat;
  position: relative;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.content{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
}
.item-image{
  width: 80px;
  margin-right: 10px;
}

.storey_img{
  width: 100%;
  min-height: 200px;
  background-image: url('@/assets/images/Group.png');
  background-size: 100% 80%;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}
.storey{
  width: 100%;
  min-height: 200px;
  background-size: 100% 80%;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ment-item-box{
  display: flex;
  align-content: center;
  justify-content: center;
  margin-right: 20px;
}

.ment-item-img{
  width: 100px;
  height: 100px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 20px;
  background-color: burlywood;
  border-radius: 10px;
}
/* .ment-item-img:last-child{
  margin-right: 0;
} */
.ment-item{
  cursor: pointer;
  width: auto;
  padding: 0 16px;
  height: 30px;
  border-radius: 10px;
  border-width: 1px;
  border-style: solid;
  display: flex;
  align-content: center;
  justify-content: center;
  color: #fff
}


</style>

<script setup>
import { ref, watch } from 'vue'
import Message from 'vue-m-message'

const props = defineProps({
  treeData: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['nodeChange'])


const renderStoreyData = ref([])

watch(() => props.treeData, (newValue) => {
  renderStoreyData.value = newValue.map((item) => {
    return {
      parentId: item.id,
      parentName: item.label,
      list: item.children
    }
  })
}, {
  immediate: true,
  deep: true
})


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
  emit('nodeChange', node)
  const clickIndex = renderStoreyData.value.findIndex((item) => {
    return parentNode.parentName === item.parentName
  })

  // 只有一个节点且不是最后一层时
  if (parentNode.list.length === 1 && clickIndex !== renderStoreyData.value.length - 1) {
    console.log('收缩!')
    const targetObj = findParentNode(props.treeData, node.label)
    // 收缩 
    renderStoreyData.value.splice(clickIndex + 1)
    renderStoreyData.value[renderStoreyData.value.length - 1].list = targetObj.children.map((item) => {
      return item
    })
  } else {
    console.log('展开!')
    const targetObj = findTreeNode(props.treeData, node.label)

    if (!targetObj.children || targetObj.children && targetObj.children.length === 0) {
      Message.info('该节点下无节点')
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
          ...item,
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
        <span>{{ renderStoreyData[0].parentName }}</span>
      </div>
    </div>
    <div v-for="(item, index) in renderStoreyData" :key="item.parentName" :class="getClass(index === renderStoreyData.length - 1)" :style="getClass(index === renderStoreyData.length - 1) === 'storey_img' ? {transform: `perspective(500px) rotateX(35deg) scale(${1 - (renderStoreyData.length - 1 - index) * 0.1})`, boxShadow: '0 35px 35px -20px rgba(0, 0, 0, 0.6)'} : {}">
      <div v-for="node in item.list" :key="node.label" class="ment-item-box">
        <!-- <div v-if="node.icon" class="ment-item-img" :style="{backgroundImage: `url(${node.icon})`}" @click="nodeClick(node, item)">
          {{ node.label }}
        </div>
        <div v-else class="ment-item" :style="{backgroundColor: node.tagBg, borderColor: node.tagBg}" @click="nodeClick(node, item)">
          {{ node.label }}
        </div> -->
        <div class="ment-item-img" :style="{backgroundImage: `url(src/assets/images/baseIcon.png)`}" :title="node.label" @click="nodeClick(node, item)">
          {{ node.label }}
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
  font-family: 'YouSheBiaoTiHei';
  font-size: 26px;
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
  height: 100px;
  /* min-height: 200px; */
  background-image: url('@/assets/images/Group.png');
  /* background: skyblue; */
  border-radius: 90%;
  background-size: 100% 80%;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 1s all;
}
.storey{
  width: 100%;
  height: 100px;
  /* min-height: 200px; */
  background-size: 100% 80%;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.5s all;
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
  cursor: pointer;
  margin-right: 20px;
  border-radius: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;
  line-height: 100px;
  font-family: 'YouSheBiaoTiHei';
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

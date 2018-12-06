<template>
  <div>
  <div class="container">
    <Form >
      <Row  justify="start" type="flex" class="code-row-bg">
        <Col span="12">
          <Form-item label="姓名">
            {{this.formdata.name}}
          </Form-item>
        </Col>
        <Col span="12">
          <Form-item label="出生日期">
            {{this.formdata.birthdate}}
          </Form-item>
        </Col>
      </Row>
      <Row justify="start" type="flex" class="code-row-bg">
        <Col span="12">
          <Form-item label="性别">
            {{this.formdata.sex}}
          </Form-item>
        </Col>
        <i-col span="12">
          <Form-item label="穿衣尺码">
            {{this.formdata.enterprise}}
          </Form-item>
        </i-col>
      </Row>
      <Row :gutter="16" justify="start" type="flex" class="code-row-bg">
        <i-col span="12">
          <Form-item label="企业">
            {{this.formdata.company}}
          </Form-item>
        </i-col>
        <i-col span="6">
          <Form-item label="职位">
            {{this.formdata.position}}
          </Form-item>
        </i-col>
      </Row>
      <Row :gutter="16" justify="start" type="flex" class="code-row-bg">
        <i-col span="12">
          <Form-item label="曾带领团队的最大规模">
            {{this.formdata.Maxteamscale}}
          </Form-item>
        </i-col>
        <i-col span="12">
          <Form-item label="先带领团队规模">
            {{this.formdata.Nowteamscale}}
          </Form-item>
        </i-col>
      </Row>
      <Row :gutter="16" justify="start" type="flex" class="code-row-bg">
        <i-col span="12">
          <Form-item label="从事开发工作起始年">
            {{this.formdata.begindevelopyear}}
          </Form-item>
        </i-col>
        <i-col span="12">
          <Form-item label="从事管理工作起始年">
            {{this.formdata.beginmanageyear}}
          </Form-item>
        </i-col>
      </Row>
      <Row :gutter="16" justify="start" type="flex" class="code-row-bg">
        <i-col span="12">
          <Form-item label="所在省市">
            {{this.formdata.address}}
          </Form-item>
        </i-col>
      </Row>
    </Form>

  </div>
  <Button @click="getPdf()" type="success">点击下载为pdf</Button>
  </div>
</template>

<script>
import html2Canvas from 'html2canvas'
import JsPDF from 'jspdf'
    export default {
        name: "ToPDF",
      data(){
          return {
            formdata:{
              name: '这是一张表',
              birthdate: '2018-5-9',
              sex:'',
              enterprise: '',   //穿衣尺码
              address: '',  //地址:所在省市
              company:'',
              position: '',
              Maxteamscale:'', //最大团队规模
              Nowteamscale:'', //现带团队最大规模
              begindevelopyear:'', //从事开发起始年
              beginmanageyear:'', // 从事管理开始年
              checkTagsField:[] ,//专注领域
              checkTagsBehavior: [],
              checkTagsInterest: [],
            },
            KeyArray:[]
          }
      },
    methods:{
      init (){
          this.KeyArray = Array.from(this.formdata)
          console.log(this.KeyArray);
        },
      getPdf(){
        var title = this.title;
        html2Canvas(document.querySelector('.container'), {
          allowTaint: true,
          dpi:200
        }).then(function (canvas) {

            let contentWidth = canvas.width
            let contentHeight = canvas.height
            let pageHeight = contentWidth / 592.28 * 841.89
            let leftHeight = contentHeight
            let position = 0
            let imgWidth = 595.28
            let imgHeight = 592.28 / contentWidth * contentHeight
            let pageData = canvas.toDataURL('image/jpeg', 1.0)
            let PDF = new JsPDF('', 'pt', 'a4')
            if (leftHeight < pageHeight) {
              PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight)
            } else {
              while (leftHeight > 0) {
                PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
                leftHeight -= pageHeight
                position -= 841.89
                if (leftHeight > 0) {
                  PDF.addPage()
                }
              }
            }
            PDF.save(title + '.pdf')
          }
        )
      }
      },
      created(){
          this.init()
      }
    }
</script>

<style scoped>
.container{
  width: 595px;
  height: 842px;
  padding: 30px;
  line-height: 30px;
  font-size: 18px;
  font-weight: 400;
}

</style>



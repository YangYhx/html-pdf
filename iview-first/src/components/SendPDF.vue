<template>
  <div>
    <div class="container">
      <div class="title">{{this.name}}信息表</div>
      <Table border :columns="columns1" :data="data1"></Table>
      <Form>
        <Row>
          <Col span="12">
            <Form-item label="曾带领团队最大规模：">
              {{}}
            </Form-item>
          </Col>
          <Col span="12">
            <Form-item label=" 现带领团队规模：">
              {{}}
            </Form-item>
          </Col>

        </Row>
        <Row>
          <Col span="12">
            <Form-item label="从事开发工作起始年：">
              {{}}
            </Form-item>
          </Col>
          <Col span="12">
            <Form-item label=" 从事管理工作起始年：">
              {{}}
            </Form-item>
          </Col>

        </Row>
      </Form>
      <Form label-position="top">
        <FormItem label="兴趣爱好:">
          <Input type="textarea"></Input>
        </FormItem>
        <FormItem label="专注领域:">
          <Input type="textarea"></Input>
        </FormItem>
        <FormItem label="行为标签:">
          <Input type="textarea"></Input>
        </FormItem>
        <FormItem label="教育经历:">
          <Input type="textarea"></Input>
        </FormItem>
        <FormItem label="工作经历:">
          <Input type="textarea"></Input>
        </FormItem>
      </Form>
     </div>
    <div class="container">
        <Form label-position="top">

          <FormItem label="职业成就:">
            <Input type="textarea"></Input>
          </FormItem>
          <FormItem label="所需资源:">
            <Input type="textarea"></Input>
          </FormItem>
          <FormItem label="提供资源:">
            <Input type="textarea"></Input>
          </FormItem>
        </Form>
        <Form>
          <Row>
            <Col span="12">
              <Form-item label="期望加入的分会：">
                {{}}
              </Form-item>
            </Col>
            <Col span="12">
              <Form-item label=" 报名渠道：">
                {{}}
              </Form-item>
            </Col>

          </Row>
          <Row>
            <Col span="12">
              <Form-item label="了解TGO途径：">
                {{}}
              </Form-item>
            </Col>
            <Col span="12">
              <Form-item label=" 推荐人：">
                {{}}
              </Form-item>
            </Col>
          </Row>
        </Form>
        <Form label-position="top">
          <FormItem label="参加过的活动:">
            <Input type="textarea"></Input>
          </FormItem>
          <FormItem label="备注:">
            <Input type="textarea"></Input>
          </FormItem>
        </Form>
      </div>
    <Button @click="getPdf()" type="success">点击下载为pdf</Button>
  </div>

</template>

<script>
  import html2Canvas from 'html2canvas'
  import JsPDF from 'jspdf'
    export default {
        name: "SendPDF",
      data () {
        return {
          columns1: [
            {
              title: '姓名',
              key: 'name'
            },
            {
              title: '出生日期',
              key: 'age'
            },
            {
              title: '性别',
              key: 'address'
            },
            {
              title: '穿衣尺码',
              key: 'address'
            },
            {
              title: '所在城市',
              key: 'address'
            },
            {
              title: '企业',
              key: 'address'
            },
            {
              title: '职位',
              key: 'address'
            }
          ],
          data1: [
            {
              name:'ss'
            }
          ]


        }
      },
      methods:{
          init(){
            console.log(data1,'数据通过请求动态获取，暂时先写死');
          },
        getPdf(){
          var title = this.title;
          html2Canvas(document.querySelectorAll('.container')[0], {
            allowTaint: true,
            scale:2
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
  padding: 20px;
}
  input{
    width: 100%;
  }
  .title{
    text-align: center;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: 20px;
  }
</style>

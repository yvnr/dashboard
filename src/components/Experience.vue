<template>
  <CAccordionItem :item-key="experience.id">
    <CAccordionHeader>
      <CContainer>
        <CRow>
          <CCol xs="6" s="8" md="8" class="first"
            ><b>Role: </b>{{ experience.role }}
          </CCol>
          <CCol class="middle"> <b>Status: </b>{{ experience.result }} </CCol>
          <CCol class="last"><b>Posted On: </b>{{ experience.on }}</CCol>
        </CRow>
      </CContainer>
    </CAccordionHeader>
    <CAccordionBody>
      <div v-text="experience.data" style="white-space: pre-wrap"></div>
    </CAccordionBody>
  </CAccordionItem>
</template>


<script>
import {
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CContainer,
  CRow,
  CCol,
} from "@coreui/vue";

export default {
  name: "Experience",
  setup() {},
  props: {
    experience: Object,
  },
  components: {
    CAccordionItem,
    CAccordionHeader,
    CAccordionBody,
    CContainer,
    CRow,
    CCol,
  },
};
</script>

<style scoped>
CAccordionItem {
  font-size: 2rem;
}
.first {
  left: 0rem;
}
</style>
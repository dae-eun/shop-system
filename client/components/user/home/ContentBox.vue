<script setup>

</script>

<template>
  <div
    class="q-pa-md row items-start justify-center"
  >
    <div class="mT30 col-12">
      <div class="q-pa-md tC mAuto title wd_per50 underBar text-h4 relative-position">
        Board Name
        <q-btn
          flat
          icon="more_horiz"
          size="16px"
          class="absolute-right"
        />
      </div>
      <q-card-section>
        <q-list
          class="q-pa-md row items-start q-gutter-md justify-center"
          separator
        >
          <q-card
            class="my-card "
            bordered
          >
            <nuxt-link to="/board/1">
              <q-img src="" />

              <q-card-section>
                <div class="text-overline text-orange-9">
                  Overline
                </div>
                <div class="text-h5 q-mt-sm q-mb-xs">
                  Title
                </div>
                <div class="text-caption text-grey">
                  Lorem ipsum dolor sit amet, consectetur
                </div>
              </q-card-section>
            </nuxt-link>
          </q-card>
        </q-list>
      </q-card-section>
    </div>
    <div class="mT30 col-6">
      <div class="q-pa-md tC mAuto title wd_per50 underBar text-h4 relative-position">
        Board Name
        <q-btn
          flat
          icon="more_horiz"
          size="16px"
          class="absolute-right"
        />
      </div>
      <q-card-section>
        <q-list
          separator
        >
          <nuxt-link to="/board/1">
            <div class="row justify-between items-center q-py-sm boardUnderBar">
              <p
                class="ellipsis mB0"
                style="max-width: 270px;"
              >

                걔가 그래서 어쩌고 저쩌고 그랬데 어쩌고 저쩌고 그랬데어쩌고 저쩌고 그랬데
              </p>
              <p
                class="ellipsis mB0"
                style="max-width: 72px;"
              >
                2024.04.05
              </p>
            </div>
          </nuxt-link>
          <nuxt-link to="/board/1">
            <div class="row justify-between items-center q-py-sm boardUnderBar">
              <p
                class="ellipsis mB0"
                style="max-width: 270px;"
              >

                걔가 그래서 어쩌고 저쩌고 그랬데 어쩌고 저쩌고 그랬데어쩌고 저쩌고 그랬데
              </p>
              <p
                class="ellipsis mB0"
                style="max-width: 72px;"
              >
                2024.04.05
              </p>
            </div>
          </nuxt-link>
          <nuxt-link to="/board/1">
            <div class="row justify-between items-center q-py-sm boardUnderBar">
              <p
                class="ellipsis mB0"
                style="max-width: 270px;"
              >

                걔가 그래서 어쩌고 저쩌고 그랬데 어쩌고 저쩌고 그랬데어쩌고 저쩌고 그랬데
              </p>
              <p
                class="ellipsis mB0"
                style="max-width: 72px;"
              >
                2024.04.05
              </p>
            </div>
          </nuxt-link>
          <nuxt-link to="/board/1">
            <div class="row justify-between items-center q-py-sm boardUnderBar">
              <p
                class="ellipsis mB0"
                style="max-width: 270px;"
              >

                걔가 그래서 어쩌고 저쩌고 그랬데 어쩌고 저쩌고 그랬데어쩌고 저쩌고 그랬데
              </p>
              <p
                class="ellipsis mB0"
                style="max-width: 72px;"
              >
                2024.04.05
              </p>
            </div>
          </nuxt-link>
          <nuxt-link to="/board/1">
            <div class="row justify-between items-center q-py-sm boardUnderBar">
              <p
                class="ellipsis mB0"
                style="max-width: 270px;"
              >

                걔가 그래서 어쩌고 저쩌고 그랬데 어쩌고 저쩌고 그랬데어쩌고 저쩌고 그랬데
              </p>
              <p
                class="ellipsis mB0"
                style="max-width: 72px;"
              >
                2024.04.05
              </p>
            </div>
          </nuxt-link>
        </q-list>
      </q-card-section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.underBar {
    border-bottom: 2px solid #e0e0e0;
  }
  .boardUnderBar {
    border-bottom: 1px solid #e0e0e0;
  }
</style>

<template>
  <div>
    <b-card
      header-tag="header"
      class="mb-3"
      no-body
    >
      <template v-slot:header>
        <b-row align-v="center" cols="1" cols-md="2">
          <b-col>
            <h5 class="mb-0 text-left my-auto">{{category.name}}</h5>
          </b-col>
          <b-col>
            <div class="pretty p-switch mb-0 float-md-right float-left">
              <input
                @change="modifyUserCategory"
                type="checkbox"
                v-model="category.userCategory.active"
              />
              <div class="state p-info ">
                <label>Be-/kikapcsolás</label>
              </div>
            </div>
          </b-col>
        </b-row>
      </template>
      <b-row no-gutters align-h="start" cols="1" cols-md="2">
        <b-col md="6">
          <b-card-img
            :src="imagePath"
            alt="Card image"
            class="cardImage"
          />
        </b-col>
        <b-col>
          <b-card-body>
            <b-card-text>
              <b-input-group
                class="mr-1 p-0"
                prepend="Súly:"
                :append="weightType === 'percentage' ? '%' : 'Ft' "
              >
                <b-form-input
                  v-if="visible"
                  type="number"
                  :value="sumOfSubcategories"
                  disabled
                />
                <b-form-input
                  v-else
                  type="number"
                  v-model="category.userCategory[weightType]"
                  @input="setTimer"
                  :disabled="!category.userCategory.active"
                />
              </b-input-group>
              <b-button
                variant="primary"
                @click="visible = !visible"
                class="m-3"
                :disabled="!category.userCategory.active"
              >
                Alkategóriák
              </b-button>
              <b-collapse id="subCategories" v-if="category.userCategory.active" v-model="visible">
                <b-row align-v="center" class="ml-0"
                  v-for="subcategory in category.children"
                  :key="subcategory.id"
                >
                  <b-form-checkbox switch class="mr-1 text-left" v-model="subcategory.active"/>
                  <div class="mb-0 text-left">{{subcategory.name}}</div>
                  <b-input-group
                    class="mr-1 p-0 input-group-sm mb-3"
                    :append="weightType === 'percentage' ? '%' : 'Ft' "
                  >
                    <b-form-input
                      v-model="subcategory[weightType]"
                      type="number"
                      @input="setTimer"
                      :disabled="!subcategory.active"
                    />
                  </b-input-group>
                </b-row>
              </b-collapse>
            </b-card-text>
          </b-card-body>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
import CategoryDto from '../dtos/CategoryDto';

export default {
  name: 'CategoryComponent',
  props: {
    category: CategoryDto,
    weightType: String,
  },
  data: () => ({
    typingTimer: null,
    visible: false,
  }),
  computed: {
    imagePath() {
      return `${process.env.VUE_APP_API_ENDPOINT}/images/${this.category.imagePath}`;
    },
    sumOfSubcategories() {
      return this.category.children
        .map((category) => parseFloat(category[this.weightType] ?? 0))
        .reduce((a, b) => a + b);
    },
  },
  methods: {
    modifyUserCategory() {
      if (this.$store.state.auth.user) {
        this.$store.dispatch('categories/setUserSpecific', this.category.userCategory);
      }
    },
    setTimer() {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => {
        this.modifyUserCategory();
      }, 2000);
    },
  },
};
</script>

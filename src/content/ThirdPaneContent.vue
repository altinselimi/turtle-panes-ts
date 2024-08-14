<template>
  <div class="third-pane__wrapper">
    <h2>About the Author</h2>
    <div class="author-info">
      <img
        src="https://via.placeholder.com/80x80?text=Author+Image"
        alt="Author Profile Picture"
      />
      <div>
        <p class="author-name">Jane Doe</p>
        <p class="author-bio">
          Jane Doe is a web developer and tech enthusiast with over 10 years of
          experience in frontend development. She loves sharing her knowledge
          through blogs and tutorials.
        </p>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.third-pane {
  &__wrapper {
    padding: 20px;
    h2 {
      margin-top: 0px;
    }
    .author-info {
      display: flex;
      align-items: center;
      gap: 20px;
      img {
        border-radius: 50%;
      }
      .author-name {
        font-weight: bold;
        margin: 0px;
      }
      .author-bio {
        margin: 0px;
        opacity: 0.8;
      }
    }
  }
}
</style>

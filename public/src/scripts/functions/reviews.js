export class ReviewRenderer {
  constructor(containerSelector, apiEndpoint, swiperInstance) {
    this.container = document.querySelector(containerSelector);
    this.apiEndpoint = apiEndpoint;
    this.swiper = swiperInstance;

    this.loadReviews();
  }

  async loadReviews() {
    try {
      const res = await fetch(this.apiEndpoint);
      if (!res.ok) throw new Error('Не вдалося завантажити відгуки');
      const reviews = await res.json();

      reviews.forEach(r => this.renderReview(r));

      this.swiper.loopedSlides = this.container.children.length;
      this.swiper.loopDestroy();
      this.swiper.loopCreate();
      this.swiper.update();
    } catch (err) {
      console.error('Помилка при завантаженні відгуків:', err);
    }
  }

  renderReview(review) {
    const section = document.createElement('section');
    section.classList.add('reviews__slide', 'swiper-slide');

    section.innerHTML = `
      <article class="reviews__card card-review">
        <header class="card-review__header">
          <div class="card-review__user-info">
            <section class="card-review__awatar">
              <picture>
                <source srcset="./src/images/awatars/duck-${review.avatar_id}.webp" type="image/webp">
                <img width="40" height="40" loading="lazy" fetchpriority="low"
                  src="./src/images/awatars/duck-${review.avatar_id}.png" alt="Аватар користувача">
              </picture>
            </section>
            <div class="card-review__info-group">
              <h3 class="card-review__user-name">${review.username}</h3>
              <time class="card-review__datetime" datetime="${review.published_at}" data-time>
                ${review.published_at ? new Date(review.published_at).toLocaleDateString() : ''}
              </time>
            </div>
          </div>
          <ul class="card-review__rating" aria-label="Рейтинг користувача">
            ${this.renderRating(review.rating)}
          </ul>
        </header>
        <div class="card-review__content">
          <p class="card-review__paragraph">${review.review_text}</p>
        </div>
        <footer class="card-review__footer">
          <section class="card-review__pluses">
            <h3 class="card-review__group-title">
              <i aria-hidden="true" class="icon-plus"></i> Плюси:
            </h3>
            <section class="card-review__list card-review__pluses-list">
              ${this.renderList(review.pros)}
            </section>
          </section>
          <section class="card-review__minuses">
            <h3 class="card-review__group-title">
              <i aria-hidden="true" class="icon-minus"></i> Мінуси:
            </h3>
            <section class="card-review__list card-review__minusess-list">
              ${this.renderList(review.cons)}
            </section>
          </section>
        </footer>
      </article>
    `;

    this.container.appendChild(section);
  }

  renderRating(rating) {
    let html = '';
    for(let i = 1; i <= 5; i++) {
      html += `<li class="card-review__rating-item${i <= rating ? ' card-review__rating-item_active' : ''}">
          <i aria-hidden="true" class="icon-duck"></i>
        </li>`;
    }
    return html;
  }

  renderList(text) {
    if(!text) return '';
    return text.split(',').map((item, i, arr) =>
      `<span>${item.trim()}</span>${i < arr.length - 1 ? ', ' : ''}`
    ).join('');
  }

  addReview(review) {
    this.renderReview(review);
    this.swiper.loopedSlides = this.container.children.length;
    this.swiper.loopDestroy();
    this.swiper.loopCreate();
    this.swiper.update();
    this.swiper.slideTo(this.container.children.length - 1);
  }
}

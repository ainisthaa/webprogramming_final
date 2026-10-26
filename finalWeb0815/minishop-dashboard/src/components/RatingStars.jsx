import { Star } from 'lucide-react'

function RatingStars({ rating, large = false }) {
  if (!rating || rating.count === 0) {
    return <p className="text-xs text-slate-400">No reviews yet</p>
  }

  const filled = Math.round(rating.rate)
  const starSize = large ? 'h-5 w-5' : 'h-3.5 w-3.5'

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSize} ${star <= filled ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`}
          />
        ))}
      </div>
      <span className="sr-only">Rated {rating.rate} out of 5.</span>
      <span className={large ? 'text-sm text-slate-600' : 'text-xs text-slate-500'}>
        {rating.rate.toFixed(1)} ({rating.count} reviews)
      </span>
    </div>
  )
}

export default RatingStars

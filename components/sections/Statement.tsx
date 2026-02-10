'use client'

interface StatementProps {
  text: string
  highlightedText?: string
}

export default function Statement({ text, highlightedText }: StatementProps) {
  const parts = highlightedText ? text.split(highlightedText) : [text]

  return (
    <section className="statement-section">
      <div>
        <p className="statement-text">
          {highlightedText ? (
            <>
              {parts[0]}
              <em>{highlightedText}</em>
              {parts[1]}
            </>
          ) : (
            text
          )}
        </p>
        <div className="gold-rule"></div>
      </div>
    </section>
  )
}

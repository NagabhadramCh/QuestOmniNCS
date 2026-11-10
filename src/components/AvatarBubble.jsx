export default function AvatarBubble({ onClick }) {
  return (
    <button className="avatar-bubble" type="button" onClick={onClick} aria-label="Open chat">
      💬
    </button>
  );
}

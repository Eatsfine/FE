interface Props {
  name: string;
}

export default function ProfileAvatar({ name }: Props) {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-full bg-gray-200 text-3xl font-semibold text-gray-600">
      {name[0]}
    </div>
  );
}

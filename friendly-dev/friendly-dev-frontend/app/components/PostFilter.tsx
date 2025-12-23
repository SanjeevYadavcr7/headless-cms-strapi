type PostFilterProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

const PostFilter: React.FC<PostFilterProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className='mb-6'>
      <input
        type='text'
        placeholder='Search Posts...'
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className='w-full px-4 py-2 rounded-lg text-white bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
      />
    </div>
  );
};

export default PostFilter;

#!/bin/bash
find packages/core/src/components -type f -name "*.tsx" | xargs sed -i '' \
  -e "s/'body1'/'body'/g" \
  -e "s/'body2'/'body'/g" \
  -e "s/'label1'/'meta'/g" \
  -e "s/'label2'/'meta'/g" \
  -e "s/'caption1'/'meta'/g" \
  -e "s/'caption2'/'meta'/g" \
  -e "s/'heading1'/'h2'/g" \
  -e "s/'heading2'/'h3'/g" \
  -e "s/'title1'/'h1'/g" \
  -e "s/'title2'/'h2'/g" \
  -e "s/'title3'/'h3'/g" \
  -e "s/'display1'/'display'/g" \
  -e "s/'display2'/'display'/g"

# Also fix Text.tsx type definitions
sed -i '' -e "s/body1/body/g" packages/core/src/components/Text.tsx
sed -i '' -e "s/body2/body/g" packages/core/src/components/Text.tsx

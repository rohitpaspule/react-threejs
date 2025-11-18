# Testing Plan & Strategy

## Overview

This document outlines the testing strategy for the Immersive 3D Blog platform, including unit tests, integration tests, and manual testing procedures.

## Test Coverage Goals

- **Target**: 80%+ code coverage
- **Critical Paths**: 100% coverage
- **UI Components**: 70%+ coverage
- **Utilities**: 90%+ coverage
- **Hooks**: 85%+ coverage

## Testing Stack

- **Test Runner**: Jest
- **React Testing**: React Testing Library
- **Mocking**: Jest mocks
- **Coverage**: Istanbul (via Jest)

## Unit Tests

### ✅ Implemented Tests

#### Utilities

1. **Coordinate Conversion** (`coordinates.test.ts`)
   - ✅ North Pole conversion
   - ✅ South Pole conversion
   - ✅ Equator conversion
   - ✅ Custom radius handling
   - ✅ Position tuple generation
   - ✅ Camera positioning

2. **Time of Day** (`time.test.ts`)
   - ✅ Current time detection
   - ✅ Aurora activation logic (polar regions)
   - ✅ Sky color selection
   - ✅ Ambient light intensity
   - ✅ Edge cases (60° latitude boundary)

3. **WebGL Detection** (`webgl.test.ts`)
   - ✅ Support detection
   - ✅ Capability reporting
   - ✅ Graceful error handling

#### Hooks

4. **useAudio** (`useAudio.test.tsx`)
   - ✅ Initialization
   - ✅ Null URL handling
   - ✅ Function exports (play, pause, stop, setVolume)
   - ⏳ TODO: Howler.js interaction testing

5. **useTimeOfDay** (`useTimeOfDay.test.tsx`)
   - ✅ Time setting on mount
   - ✅ Blog time preference override
   - ✅ Aurora activation for polar locations
   - ✅ Aurora deactivation for non-polar locations

### 🔜 Planned Tests

#### Components

1. **BlogCard Component**
   ```typescript
   describe('BlogCard', () => {
     it('renders blog information correctly')
     it('displays preview image')
     it('shows tags if available')
     it('formats coordinates')
     it('links to correct blog page')
   })
   ```

2. **AudioControls Component**
   ```typescript
   describe('AudioControls', () => {
     it('shows enable button when audio not enabled')
     it('shows mute button when audio enabled')
     it('displays volume slider on hover')
     it('updates store on mute toggle')
     it('updates store on volume change')
   })
   ```

3. **Navigation Component**
   ```typescript
   describe('Navigation', () => {
     it('renders all nav items')
     it('highlights active route')
     it('navigates on click')
   })
   ```

#### 3D Components

4. **Scene Component**
   ```typescript
   describe('Scene', () => {
     it('renders canvas')
     it('passes markers to World component')
     it('applies correct lighting based on time of day')
     it('shows aurora when active')
     it('shows stars at night')
   })
   ```

5. **BlogMarker Component**
   ```typescript
   describe('BlogMarker', () => {
     it('renders at correct position')
     it('shows label on hover')
     it('calls onClick when clicked')
     it('changes cursor on hover')
   })
   ```

## Integration Tests

### Page-Level Tests

1. **Home Page**
   ```typescript
   describe('Home Page', () => {
     it('renders hero content')
     it('shows 3D scene when WebGL supported')
     it('shows fallback when WebGL not supported')
     it('has working CTA buttons')
   })
   ```

2. **Blogs List Page**
   ```typescript
   describe('Blogs Page', () => {
     it('loads all blog posts')
     it('renders blog cards')
     it('shows message when no blogs')
     it('filters by tags (if implemented)')
   })
   ```

3. **Blog Detail Page**
   ```typescript
   describe('Blog Detail Page', () => {
     it('loads blog content')
     it('renders 3D scene')
     it('shows floating panel with content')
     it('toggles Google Earth view')
     it('initializes audio')
     it('applies time-of-day settings')
   })
   ```

### User Flow Tests

```typescript
describe('User Flows', () => {
  describe('Reading a blog post', () => {
    it('navigates from home to blog list')
    it('selects a blog post')
    it('enables audio')
    it('reads content')
    it('toggles Earth view')
    it('returns to blog list')
  })

  describe('Dashboard exploration', () => {
    it('navigates to dashboard')
    it('clicks on globe marker')
    it('navigates to blog detail')
  })
})
```

## End-to-End Tests (Future)

### Recommended: Playwright or Cypress

```typescript
// Example E2E test with Playwright
test('complete blog reading flow', async ({ page }) => {
  await page.goto('/')
  await page.click('text=Explore Blogs')
  await page.click('text=Journey to the North Pole')

  // Wait for 3D scene to load
  await page.waitForSelector('canvas')

  // Enable audio
  await page.click('text=Enable Audio')

  // Toggle Earth view
  await page.click('text=Show Earth View')

  // Verify content is visible
  await expect(page.locator('h1')).toContainText('North Pole')
})
```

## Visual Regression Tests (Future)

### Recommended: Percy or Chromatic

```typescript
// Example with Chromatic
test('blog card visual', async ({ page }) => {
  await page.goto('/blogs')
  await percySnapshot(page, 'Blog Cards Grid')
})
```

## Performance Tests

### Lighthouse CI

```yaml
# .lighthouserc.yml
ci:
  collect:
    numberOfRuns: 3
    url:
      - http://localhost:3000
      - http://localhost:3000/blogs
      - http://localhost:3000/dashboard
  assert:
    assertions:
      categories:performance: ['error', {minScore: 0.85}]
      categories:accessibility: ['error', {minScore: 0.95}]
      categories:best-practices: ['error', {minScore: 0.90}]
      categories:seo: ['error', {minScore: 0.90}]
```

### Core Web Vitals Monitoring

Monitor in production:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

## Manual Testing Checklist

### ✅ Functionality

- [ ] 3D scene renders correctly
- [ ] Blog markers appear at correct positions
- [ ] Camera rotates and zooms smoothly
- [ ] Clicking markers navigates to blogs
- [ ] Audio enables after user gesture
- [ ] Audio plays and loops correctly
- [ ] Mute/unmute works
- [ ] Volume control works
- [ ] Google Earth view toggles
- [ ] Time-of-day changes correctly
- [ ] Aurora appears for polar locations at night
- [ ] Navigation links work
- [ ] Blog content renders (markdown)
- [ ] Back button works
- [ ] WebGL fallback displays for unsupported browsers

### ✅ Responsive Design

- [ ] Mobile (320px - 480px)
- [ ] Tablet (481px - 768px)
- [ ] Desktop (769px+)
- [ ] Large screens (1920px+)

### ✅ Browser Compatibility

- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Mobile Chrome (Android)

### ✅ Accessibility

- [ ] Keyboard navigation works
- [ ] Focus indicators visible
- [ ] Screen reader announces content correctly
- [ ] ARIA labels present
- [ ] Color contrast passes WCAG AA
- [ ] Works with high contrast mode
- [ ] Works with reduced motion preference

### ✅ Performance

- [ ] Initial page load < 3s
- [ ] Time to Interactive < 3.5s
- [ ] 3D scene renders at 60fps
- [ ] Audio loads without blocking
- [ ] Images lazy load
- [ ] Google Earth iframe lazy loads
- [ ] No layout shift (CLS < 0.1)

## Running Tests

### Unit Tests

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- coordinates.test.ts

# Watch mode (re-run on changes)
npm run test:watch

# Update snapshots
npm test -- -u
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

### Full Test Suite

```bash
# Run everything
npm run lint && npm run type-check && npm test -- --coverage
```

## Continuous Integration

Tests run automatically on:
- Every push to main
- Every pull request
- Before deployment

See `.github/workflows/deploy.yml` for CI configuration.

## Test Maintenance

### When to Update Tests

1. **Bug Fixes**: Add test for regression
2. **New Features**: Add tests before implementing (TDD)
3. **Refactoring**: Ensure tests still pass
4. **Breaking Changes**: Update affected tests

### Code Coverage Reports

View coverage reports:
```bash
npm test -- --coverage
open coverage/lcov-report/index.html
```

## Best Practices

### 1. Test Behavior, Not Implementation

❌ Bad:
```typescript
expect(component.state.count).toBe(5)
```

✅ Good:
```typescript
expect(screen.getByText('Count: 5')).toBeInTheDocument()
```

### 2. Use Descriptive Test Names

❌ Bad:
```typescript
it('works', () => {})
```

✅ Good:
```typescript
it('converts North Pole coordinates to correct 3D position', () => {})
```

### 3. Arrange-Act-Assert Pattern

```typescript
it('mutes audio when mute button clicked', () => {
  // Arrange
  const { getByLabelText } = render(<AudioControls />)

  // Act
  fireEvent.click(getByLabelText('Mute'))

  // Assert
  expect(mockSetMuted).toHaveBeenCalledWith(true)
})
```

### 4. Mock External Dependencies

```typescript
jest.mock('howler', () => ({
  Howl: jest.fn().mockImplementation(() => ({
    play: jest.fn(),
    pause: jest.fn(),
  })),
}))
```

### 5. Clean Up After Tests

```typescript
afterEach(() => {
  jest.clearAllMocks()
  cleanup()
})
```

## Debugging Tests

### Run Single Test

```bash
npm test -- -t "converts North Pole coordinates"
```

### Debug in VSCode

Add to `.vscode/launch.json`:
```json
{
  "type": "node",
  "request": "launch",
  "name": "Jest Debug",
  "program": "${workspaceFolder}/node_modules/.bin/jest",
  "args": ["--runInBand", "--no-cache"],
  "console": "integratedTerminal",
  "internalConsoleOptions": "neverOpen"
}
```

## Future Testing Improvements

- [ ] Add E2E tests with Playwright
- [ ] Implement visual regression testing
- [ ] Add performance regression tests
- [ ] Set up mutation testing
- [ ] Add API integration tests (if backend added)
- [ ] Implement contract testing
- [ ] Add accessibility automated tests (axe-core)

## Resources

- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [WCAG Testing](https://www.w3.org/WAI/test-evaluate/)
